// Arreglo para almacenar los productos
let inventario = [];

// Seleccion de elementos del DOM
const formAgregar = document.querySelector('#formAgregar');
const formActualizar = document.querySelector('#formActualizar');
const listaProductos = document.querySelector('#listaProductos');
const btnEliminar = document.querySelector('#btnEliminar');
const formEliminar = document.querySelector('#formEliminar');

// Función para mostrar los productos en la lista
function mostrarProductos() {
    listaProductos.innerHTML = '';
    if (inventario.length === 0) {
        listaProductos.innerHTML = '<li>El inventario está vacío.</li>';
    } else {
        for (let i = 0; i <= inventario.length - 1; i++){
            const producto = inventario[i];
            const li = document.createElement('li');
            li.textContent = `Producto: ${producto.nombre}, Cantidad: ${producto.cantidad}`;
            listaProductos.appendChild(li);
        }
    }
}

// Función para agregar un producto
function agregarProducto(nombre, cantidad) {
    const productoExistente = inventario.find(producto => producto.nombre === nombre);
    if (productoExistente) {
        Swal.fire({
            icon:'error',
            title:'Oops...',
            text:`El producto ${nombre} ya existe.`
        });
    } else {
        if (cantidad > 0) {
            inventario.push({ nombre: nombre, cantidad: cantidad });
            Swal.fire({
                icon:'success',
                title:'Producto agregado con exito!!'
            });
            mostrarProductos();
        } else {
            Swal.fire({
                icon:'warning',
                title:'Cuidado!!',
                text:"La cantidad debe ser mayor que 0."
            });
        }
    }
}

// Función para actualizar la cantidad de un producto
function actualizarProducto(nombre, nuevaCantidad) {
    const productoExistente = inventario.find(producto => producto.nombre === nombre);
    if (productoExistente) {
        if (nuevaCantidad > 0) {
            productoExistente.cantidad = nuevaCantidad;
            Swal.fire({
                icon:'success',
                title:'Producto actualizado con exito!!'
            });
            mostrarProductos();
        } else {
            Swal.fire({
                icon:'warning',
                title:'Cuidado!!',
                text:"La cantidad debe ser mayor que 0."
            });
        }
    } else {
        Swal.fire({
            icon:'error',
            title:'Oops...',
            text:`El producto ${nombre} no existe en el inventario.`
        });
    }
}

// Función para eliminar productos
function eliminarSinStock(nombre) {
    const productoExistente = inventario.find(producto => producto.nombre !== nombre);
    if (productoExistente) {
        Swal.fire({
            icon:'error',
            title:'Oops...',
            text:`El producto ${nombre} no existe.`
        });
    }else if(inventario.length === 0){
        Swal.fire({
            icon:'error',
            title:'Oops...',
            text:`El inventario esta vacio!!`
        });
    }else {
        inventario = inventario.filter(producto => producto.nombre !== nombre);
        Swal.fire({
            icon:'success',
            title:'Producto eliminado con exito!!'
        });
    }
    formEliminar.reset();
    mostrarProductos();
}

// Eventos del formulario para agregar productos
formAgregar.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.querySelector('#nombreProducto').value;
    const cantidad = parseInt(document.querySelector('#cantidadProducto').value);
    agregarProducto(nombre, cantidad);
    formAgregar.reset();
});

// Eventos del formulario para actualizar productos
formActualizar.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.querySelector('#nombreActualizar').value;
    const cantidad = parseInt(document.querySelector('#nuevaCantidad').value);
    actualizarProducto(nombre, cantidad);
    formActualizar.reset();
});

// Evento para eliminar productos
btnEliminar.addEventListener('click', () => {
    const nombre =  document.querySelector('#nombreEliminar').value;
    eliminarSinStock(nombre);
});
// Mostrar productos al cargar la página
mostrarProductos();