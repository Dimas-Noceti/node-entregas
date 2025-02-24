const socket = io();  // "io" hace referencia a socket.io


/* socket.emit('mensaje', 'Hola mundo');

socket.on('Evento prueba', data => {
    console.log(data);
}) */



//Simulo sala de chat
/* const messageButton = document.getElementById('send');
const message = document.getElementById('message');
const messageContainer = document.getElementById('messageContainer');


messageButton.addEventListener('click', () => {
    const messageContent = message.value;
    message.value = '';
    socket.emit('nuevoMensaje', messageContent);
})

socket.on('nuevoMensaje', nuevoMensaje => {
    cargarMensaje(nuevoMensaje)
})


socket.on('loadMessages', mensajes => {
    mensajes.forEach(mensaje => cargarMensaje(mensaje));
})




function cargarMensaje(unMensaje) {
    const messageElement = document.createElement('p');
    messageElement.textContent = `${unMensaje}`;
    messageContainer.appendChild(messageElement);
} */



const nombreProducto = document.getElementById('nameProduct');
const precioProducto = document.getElementById('priceProduct');
const cantidadProducto = document.getElementById('quantityProduct');
const agregarProductoBoton = document.getElementById('send');
const productContainer = document.getElementById('productContainer');

agregarProductoBoton.addEventListener('click', () => {
    const productContent = {
        nombre: nombreProducto.value,
        precio: precioProducto.value,
        id: Math.floor(Math.random() * 1000)
    }
    nombreProducto.value = '';
    precioProducto.value = '';
    socket.emit('nuevoProducto', productContent);
});




//Carga todos los productos para los que entraron despues   
socket.on('loadProducts', productos => {
    productos.forEach(producto => cargarProducto(producto));
})





socket.on('nuevoProducto', nuevoProducto => {
    cargarProducto(nuevoProducto);
})



///Funcion para cargar productos
function cargarProducto(unProducto) {
    const productElement = document.createElement('p');
    productElement.textContent = `Nombre: ${unProducto.nombre}, Precio: ${unProducto.precio}, ID: ${unProducto.id}`;
    productContainer.appendChild(productElement);
}


//Funcion para eliminar productos
const eliminateProductButton = document.getElementById('eliminateButton');


eliminateProductButton.addEventListener('click', () => {
    const id = document.getElementById('idProduct').value;
    socket.emit('deleteProduct', id);
})