function validarFormulario() {
    console.log("Validando formulario");
    let nombre = document.getElementById("nombre")?.value.trim() || "";
    let correo = document.getElementById("correo")?.value.trim() || "";
    let mensaje = document.getElementById("mensaje")?.value.trim() || "";
    let alertas = document.getElementById("alertas");
    if (alertas) alertas.innerHTML = "";

    if (nombre === "" || correo === "" || mensaje === "") {
        if (alertas) alertas.innerHTML = `<div class="alert alert-danger">Todos los campos son obligatorios</div>`;
    } else {
        if (alertas) alertas.innerHTML = `<div class="alert alert-success">Formulario enviado correctamente ✅</div>`;
    }
}

/* =========================
   Datos: productos demo
   ========================= */
const productosDemo = [
    { id: 1, nombre: "Auriculares Inalámbricos", precio: 24990, img: "img/audifonos-wirless-earfun-free-2.jpg" }, // <-- añade .jpg
    { id: 2, nombre: "Smartwatch Deportivo",     precio: 39990, img: "img/smarwatch.jpg" },
    { id: 3, nombre: "Mochila Antirrobo",         precio: 19990, img: "img/audifonos-wirless-earfun-free-2.jpg" },
    { id: 4, nombre: "Teclado Mecánico",          precio: 45990, img: "img/audifonos-wirless-earfun-free-2.jpg" },
];

/* =========================
   Util: formatear CLP
   ========================= */
const clp = (n) => n.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

const CART_KEY = "fs2_cart";
function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
}
function setCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
function updateCartBadge() {
    const cart = getCart();
    const badge = document.getElementById("cartCount");
    if (badge) badge.textContent = cart.length;
}

/* =========================
   Render: grid de productos HOME
   ========================= */
function renderProductosHome() {
    const grid = document.getElementById("gridProductos");
    if (!grid) return;
    grid.innerHTML = productosDemo.map(p => `
    <div class="col">
      <article class="card h-100 shadow-sm">
        <img src="${p.img}" class="card-img-top" alt="${p.nombre}" onerror="this.src='img/placeholder.png'">
        <div class="card-body d-flex flex-column">
          <h3 class="h6 card-title">${p.nombre}</h3>
          <p class="fw-semibold text-primary mb-3">${clp(p.precio)}</p>
          <div class="mt-auto d-flex gap-2">
            <a href="detalle-producto.html?id=${p.id}" class="btn btn-sm btn-outline-secondary">Ver detalle</a>
            <button class="btn btn-sm btn-primary" data-id="${p.id}">Añadir</button>
          </div>
        </div>
      </article>
    </div>
  `).join("");

    grid.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-id]");
        if (!btn) return;
        const id = Number(btn.dataset.id);
        const prod = productosDemo.find(x => x.id === id);
        if (!prod) return;

        const cart = getCart();
        cart.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio, qty: 1 });
        setCart(cart);
        updateCartBadge();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderProductosHome();
    updateCartBadge();
});


