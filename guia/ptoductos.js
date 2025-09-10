const productos = [
    {
        id: "JM001",
        nombre: "Catan",
        categoria: "Juegos de Mesa",
        precio: "$29.990",
        descripcion: "Catan es un juego de mesa multijugador de estrategia y gestión de recursos. Conviértete en el primer colono en dominar la isla.",
        imagen: "https://placehold.co/600x400/39FF14/000000?text=Catan"
    },
    {
        id: "AC001",
        nombre: "Controlador Inalámbrico Xbox",
        categoria: "Accesorios",
        precio: "$59.990",
        descripcion: "Experimenta el diseño modernizado del control inalámbrico de Xbox, con superficies esculpidas y una geometría refinada para una mayor comodidad.",
        imagen: "https://placehold.co/600x400/1E90FF/FFFFFF?text=Xbox+Controller"
    },
    {
        id: "AC002",
        nombre: "Auriculares Gamer HyperX Cloud II",
        categoria: "Accesorios",
        precio: "$79.990",
        descripcion: "Conocidos por su increíble comodidad, rendimiento y durabilidad. Sonido envolvente 7.1 para una inmersión total en el juego.",
        imagen: "https://placehold.co/600x400/333333/FFFFFF?text=HyperX"
    },
    {
        id: "CO001",
        nombre: "PlayStation 5",
        categoria: "Consolas",
        precio: "$549.990",
        descripcion: "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.",
        imagen: "https://placehold.co/600x400/FFFFFF/000000?text=PS5"
    },
    {
        id: "CG001",
        nombre: "PC Gamer ASUS ROG Strix",
        categoria: "Computadores Gamers",
        precio: "$1.299.990",
        descripcion: "Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional.",
        imagen: "https://placehold.co/600x400/dc3545/FFFFFF?text=ASUS+ROG"
    },
    {
        id: "SG001",
        nombre: "Silla Gamer Secretlab Titan",
        categoria: "Sillas Gamers",
        precio: "$349.990",
        descripcion: "Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.",
        imagen: "https://placehold.co/600x400/000000/FFFFFF?text=Secretlab"
    }
];

function cargarProductos() {
    const contenedor = document.getElementById('catalogo-productos');
    if (!contenedor) return;
    productos.forEach(producto => {
        const productoHTML = `
      <div class="col">
        <div class="card h-100 bg-dark text-white">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.precio}</p>
            <a href="producto-detalle.html?id=${producto.id}" class="btn btn-primary">Ver Detalles</a>
          </div>
        </div>
      </div>
    `;
        contenedor.innerHTML += productoHTML;
    });
}
function cargarDetalleProducto() {
    const contenedor = document.getElementById('detalle-producto');
    if (!contenedor) return;
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = urlParams.get('id');
    const producto = productos.find(p => p.id === productoId);
    if (producto) {
        const detalleHTML = `
      <div class="row">
        <div class="col-md-6">
          <img src="${producto.imagen}" class="img-fluid rounded" alt="${producto.nombre}">
        </div>
        <div class="col-md-6">
          <h2>${producto.nombre}</h2>
          <p class="text-muted">${producto.categoria}</p>
          <h3>${producto.precio}</h3>
          <p>${producto.descripcion}</p>
          <button class="btn btn-success mt-3">Añadir al Carrito</button>
        </div>
      </div>
    `;
        contenedor.innerHTML = detalleHTML;
    } else {
        contenedor.innerHTML = `<div class="alert alert-danger">Producto no encontrado. <a href="productos.html" class="alert-link">Volver al catálogo</a>.</div>`;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('catalogo-productos')) {
        cargarProductos();
    }
    if (document.getElementById('detalle-producto')) {
        cargarDetalleProducto();
    }
});