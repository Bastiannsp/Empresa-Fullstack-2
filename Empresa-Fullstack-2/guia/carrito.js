// -------------------- Utils --------------------
const fmtCLP = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
const parsePrecio = (v) => parseInt(String(v).replace(/\D/g, "")) || 0;

// -------------------- Estado --------------------
let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // [{id,nombre,precio,cantidad}]

// -------------------- Persistencia + UI badge --------------------
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarBadge();
    renderCarrito(); // si estamos en carrito.html, se pintará; si no, no hace nada
}

function actualizarBadge() {
    const badge = document.getElementById("cartCount");
    if (!badge) return;
    const totalUnidades = carrito.reduce((acc, it) => acc + it.cantidad, 0);
    badge.textContent = totalUnidades;
}

// -------------------- Operaciones --------------------
function agregarProducto(id, nombre, precio) {
    precio = parsePrecio(precio);
    const idx = carrito.findIndex((it) => it.id === id);
    if (idx >= 0) {
        carrito[idx].cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    guardarCarrito();
}

function eliminarProducto(id) {
    carrito = carrito.filter((it) => it.id !== id);
    guardarCarrito();
}

function cambiarCantidad(id, delta) {
    const item = carrito.find((it) => it.id === id);
    if (!item) return;
    item.cantidad += delta;
    if (item.cantidad <= 0) {
        eliminarProducto(id);
    } else {
        guardarCarrito();
    }
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
}

// -------------------- Render carrito.html --------------------
function renderCarrito() {
    const tbody = document.getElementById("carritoItems");
    const totalEl = document.getElementById("carritoTotal");
    if (!tbody || !totalEl) return; // no estamos en carrito.html

    tbody.innerHTML = "";
    let total = 0;

    carrito.forEach((it) => {
        const subtotal = it.precio * it.cantidad;
        total += subtotal;

        tbody.insertAdjacentHTML(
            "beforeend",
            `
      <tr>
        <td>${it.nombre}</td>
        <td class="text-nowrap">
          <button class="btn btn-sm btn-outline-secondary" data-accion="restar" data-id="${it.id}">−</button>
          <span class="mx-2">${it.cantidad}</span>
          <button class="btn btn-sm btn-outline-secondary" data-accion="sumar" data-id="${it.id}">+</button>
        </td>
        <td>${fmtCLP.format(subtotal)}</td>
        <td>
          <button class="btn btn-sm btn-danger" data-accion="eliminar" data-id="${it.id}">Eliminar</button>
        </td>
      </tr>
      `
        );
    });

    totalEl.textContent = fmtCLP.format(total);
}

document.addEventListener("click", (e) => {
    // Botón agregar al carrito (en listados y en detalle)
    const btnAdd = e.target.closest(".add-to-cart");
    if (btnAdd) {
        e.preventDefault();
        const id = btnAdd.dataset.id;
        const nombre = btnAdd.dataset.nombre;
        const precio = parsePrecio(btnAdd.dataset.precio);
        agregarProducto(id, nombre, precio);
        return;
    }

    // Controles del carrito (sumar/restar/eliminar/vaciar)
    const accion = e.target.dataset.accion;
    if (!accion) return;

    if (accion === "sumar") cambiarCantidad(e.target.dataset.id, +1);
    if (accion === "restar") cambiarCantidad(e.target.dataset.id, -1);
    if (accion === "eliminar") eliminarProducto(e.target.dataset.id);
    if (accion === "vaciar") vaciarCarrito();
});

// -------------------- Init --------------------
document.addEventListener("DOMContentLoaded", () => {
    actualizarBadge();
    renderCarrito();
});
