import { Router } from "express";
import { loadData, saveData } from "../data.js";
import fs from "fs";

const router = Router();

router.get("/:cid", async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const data = await loadData();
        const cart = data.carrito.find((cart) => cart.id === cid);
        if (cart) {
            res.status(200).json(cart.products);
        } else {
            res.status(404).json({ error: "Carrito no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al cargar el carrito" });
    }
});

router.post("/", async (req, res) => {
    try {
        const data = await loadData();
        const id = data.carrito.length > 0 ? data.carrito[data.carrito.length - 1].id + 1 : 1;
        const newCart = { id: id, products: [] };
        data.carrito.push(newCart);
        await saveData(data);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el carrito" });
    }
});

router.post("/:cid/productos/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const quantity = parseInt(req.body.quantity);
        if (!quantity) {
            res.status(400).json({ error: "Falta el campo quantity" });
            return;
        }
        const data = await loadData();
        const product = data.productos.find((product) => product.id == pid);
        if (!product) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
        }
        const cart = data.carrito.find((cart) => cart.id == cid);
        if (cart) {
            const productoYaAgregado = cart.products.find((product) => product.id == pid);
            if (product.stock >= quantity) {
                if (productoYaAgregado) {
                    productoYaAgregado.quantity += quantity;
                } else {
                    cart.products.push({ id: pid, quantity: quantity });
                }
                product.stock -= quantity;
            } else {
                res.status(400).json({ error: "No hay suficiente stock" });
                return;
            }
            res.status(201).json(cart.products);
        } else {
            res.status(404).json({ error: "Carrito no encontrado" });
        }
        await saveData(data);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar el producto al carrito" });
    }
});

export default router;