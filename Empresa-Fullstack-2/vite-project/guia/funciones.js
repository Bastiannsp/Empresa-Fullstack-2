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
   Datos: productos demo (solo HOME)
   ========================= */
const productosDemo = [
    {id: "PP002", nombre: "Auriculares Inalámbricos", precio: 24990, img: "img/audifonos-wirless-earfun-free-2.jpg"},
    {id: "PP003", nombre: "Smartwatch Deportivo", precio: 39990, img: "img/smarwatch.jpg"},
    {id: "PP004", nombre: "Mochila Antirrobo", precio: 19990, img: "img/mochilla.jpg"},
    {id: "PP005", nombre: "Teclado Ajazz", precio: 45990, img: "img/ajazz.jpg"},
];

/* =========================
   Util: formatear CLP
   ========================= */
const clp = (n) => n.toLocaleString("es-CL", {style: "currency", currency: "CLP", maximumFractionDigits: 0});

const CART_KEY = "fs2_cart";

/* =========================
   Funciones de carrito
   ========================= */
function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
        return [];
    }
}

function setCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartBadge() {
    const cart = getCart();
    const badge = document.getElementById("cartCount");
    if (badge) {
        // ✅ suma cantidades en lugar de mostrar solo items distintos
        badge.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
    }
}

function addToCart(prod) {
    let cart = getCart();
    const idx = cart.findIndex(x => x.id === prod.id);
    if (idx >= 0) {
        cart[idx].qty += 1; // si ya existe, aumenta cantidad
    } else {
        cart.push({...prod, qty: 1});
    }
    setCart(cart);
    updateCartBadge();
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
            <a href="detalle.html?id=${p.id}" class="btn btn-sm btn-outline-secondary">Ver detalle</a>
            <button class="btn btn-sm btn-primary add-to-cart"
                    data-id="${p.id}"
                    data-nombre="${p.nombre}"
                    data-precio="${p.precio}"
                    data-img="${p.img}">
              🛒 Añadir
            </button>
          </div>
        </div>
      </article>
    </div>
  `).join("");

    // Delegación de eventos para botones
    grid.addEventListener("click", (e) => {
        const btn = e.target.closest("button.add-to-cart");
        if (!btn) return;

        const prod = {
            id: btn.dataset.id,
            nombre: btn.dataset.nombre,
            precio: parseInt(btn.dataset.precio),
            img: btn.dataset.img
        };

        addToCart(prod);
    });
}

/* =========================
   Init
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
    renderProductosHome();
    updateCartBadge();
});
