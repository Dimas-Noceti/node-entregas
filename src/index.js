import express from "express";
import productosRouter from "./Routes/productos.router.js";
import carritosRouter from "./Routes/carrito.router.js";

const app = express();
const PORT = 8080;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Montar las rutas
app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritosRouter);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Node.js");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});