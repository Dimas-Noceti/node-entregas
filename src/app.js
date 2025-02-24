import express from "express";
import productosRouter from "./Routes/productos.router.js";
import carritosRouter from "./Routes/carrito.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";

// Importamos los routers
import viewsRouter from "./Routes/views.router.js";
import userRouter from "./Routes/user.router.js";


//Importamos el constructor de un servidor de sockets
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ encoded: true }));


//Inicializamos el motor (HandleBars) indicando app.engine("Que motor utilizaremos,  el motor instanciado") 
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');    //Indicamos en que parte del proyecto estara las rutas
app.set('view engine', 'handlebars');       //Indicamos que motor utilizaremos


//Cargamos la carpeta 'public como nuestra carpeta de archivos estáticos
app.use(express.static(__dirname + '/public'));




// Montar las rutas
app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritosRouter);
app.use('/', viewsRouter);
app.use('/api/user', userRouter);

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});



// Creamos nuestro servidor http
const httpServer = app.listen(PORT, () => { console.log(`Servidor escuchando en http://localhost:${PORT}`);});
//Creamos un servidor de sockets que vive dentro de nuestro servidor http
const socketServer = new Server(httpServer);




// (EJERCICIO DE MENSAJES)
const mensajes = [];



//Escuchamos eventos de conexion de sockets entrantes
/* socketServer.on('connection', socket => {
    console.log('Un cliente se ha conectado');
     socket.on('mensaje', data => {
        console.log(data);
    

     socket.emit('Evento prueba', 'Chau mundo');     //Tambien esta socket.broadcoast.emit que envia a todos los sockets conectados menos al que lo emitio
    //socketServer.emit Envia a todos los sockets conectados sin excepcion




    // Ejercicio de mensajes

    //Cada vez que alguien se conecte le mando los mensajes
    socket.emit('loadMessages', mensajes);



    socket.on('nuevoMensaje', nuevoMensaje => {
      mensajes.push(nuevoMensaje);
      console.log(mensajes);
      socketServer.emit('nuevoMensaje', nuevoMensaje);
    });
}
) 
}) */


const productos = [];


socketServer.on('connection', socket => {
  console.log('Un cliente se ha conectado');

  //Carga todos los productos para los que entraron despues
  socket.emit('loadProducts', productos);



  //Agrega productos
  socket.on('nuevoProducto', nuevoProducto => {
    productos.push(nuevoProducto);
    console.log(productos);
    socketServer.emit('nuevoProducto', nuevoProducto);
  })

  //Elimina productos
  socket.on('deleteProduct', (id) => {
    const index = productos.findIndex(producto => producto.id == id);

    if (index !== -1) {
        // Eliminar el producto del array
        const productoEliminado = productos.splice(index, 1);

        console.log('Producto eliminado:', productoEliminado);

        socketServer.emit('productDeleted', id); 
    } else {
        console.log('Producto no encontrado');
    }
});
})

