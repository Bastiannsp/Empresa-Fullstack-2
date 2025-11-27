const DB_KEY = 'level-up-gamer-products';
const initialProducts = [
    { id:"JM001", nombre:"Catan", categoria:"Juegos de Mesa", precio: 29990, vendidos:42, imagen:"img/.jpg", descripcion:"Un juego de estrategia donde los jugadores colonizan una isla construyendo pueblos y rutas." },
    { id:"JM002", nombre:"Carcassonne", categoria:"Juegos de Mesa", precio: 24990, vendidos:30, imagen:"img/Carcassonne.jpg", descripcion:"Construye ciudades, caminos y granjas en este juego clásico de colocación de losetas." },
    { id:"AC001", nombre:"Controlador Inalámbrico Xbox", categoria:"Accesorios", precio: 59990, vendidos:55, imagen:"img/controlXbox.jpg", descripcion:"Control inalámbrico ergonómico y preciso, compatible con consolas y PC." },
    { id:"AC002", nombre:"Auriculares HyperX Cloud II", categoria:"Accesorios", precio: 79990, vendidos:28, imagen:"img/hyperx.jpg", descripcion:"Auriculares con sonido envolvente 7.1 y micrófono desmontable, perfectos para gaming." },
    { id:"CO001", nombre:"PlayStation 5", categoria:"Consolas", precio: 549990, vendidos:15, imagen:"img/ps5.jpg", descripcion:"Consola de última generación con gráficos ultra realistas y tiempos de carga mínimos." },
    { id:"CG001", nombre:"PC Gamer ASUS ROG Strix", categoria:"Computadores Gamers", precio: 1299990, vendidos:8, imagen:"img/pcrog.jpg", descripcion:"PC de alto rendimiento ideal para juegos exigentes y streaming." },
    { id:"SG001", nombre:"Silla Gamer Secretlab Titan", categoria:"Sillas Gamers", precio: 349990, vendidos:22, imagen:"img/silla.jpg", descripcion:"Silla ergonómica de alta calidad con soporte lumbar ajustable." },
    { id:"MS001", nombre:"Mouse Logitech G502 HERO", categoria:"Mouse", precio: 49990, vendidos:35, imagen:"img/mouse.jpg", descripcion:"Mouse con sensor HERO 25K para máxima precisión y respuesta rápida." },
    { id:"MP001", nombre:"Mousepad Razer Goliathus", categoria:"Mousepad", precio: 29990, vendidos:40, imagen:"img/mousepad.jpg", descripcion:"Superficie de tela optimizada para sensores ópticos y láser." },
    { id:"PP001", nombre:"Polera Gamer 'Level-Up'", categoria:"Poleras Personalizadas", precio: 14990, vendidos:50, imagen:"img/polera.jpg", descripcion:"Polera personalizada con diseño gamer exclusivo Level-Up." },
    { id:"PP002", nombre:"Auriculares Inalámbricos", categoria:"Auriculares Inalámbricos", precio: 24990, vendidos:70, imagen:"img/audifonos-wirless-earfun-free-2.jpg", descripcion:"Auriculares inalámbricos de alto rendimiento diseñados para ofrecer una experiencia de sonido envolvente y sin interrupciones Equipados con tecnología de baja latencia, brindan audio nítido y preciso ideal para juegos, música o películas." },
    { id:"PP003", nombre:"Smartwatch Deportivo", categoria:"Smartwatch Deportivo", precio: 39990, vendidos:9, imagen:"img/smarwatch.jpg", descripcion:"Smartwatch: Reloj inteligente con pantalla táctil, seguimiento de actividad física, notificaciones de tu smartphone y monitor de salud, todo en tu muñeca." },
    { id:"PP004", nombre:"Mochila Antirrobo", categoria:"Mochila Antirobo", precio: 39990, vendidos:24, imagen:"img/mochilla.jpg", descripcion:"Mochila segura y resistente, con compartimentos ocultos y cierres reforzados, ideal para proteger tu laptop y accesorios mientras te desplazas." },
    { id:"PP005", nombre:"Teclado Ajazz", categoria:"Teclado Mecanico", precio: 45990, vendidos:12, imagen:"img/ajazz.jpg", descripcion:"Teclado mecánico de alto rendimiento, con retroiluminación RGB y teclas duraderas, perfecto para gaming y escritura rápida." }
];

function initializeDB() {
    const db = localStorage.getItem(DB_KEY);
    if (!db) {
        localStorage.setItem(DB_KEY, JSON.stringify(initialProducts));
    }
}
initializeDB();



/**
 * READ (ALL): Devuelve todos los productos de la base de datos.
 * @returns {Array}
 */
export function getProducts() {
    const db = localStorage.getItem(DB_KEY);
    return db ? JSON.parse(db) : [];
}

/**
 * READ (ONE): Busca un producto por su ID.
 * @param {string} id 
 * @returns {Object|null} 
 */
export function getProductById(id) {
    const products = getProducts();
    return products.find(p => p.id === id) || null;
}

/**
 * CREATE
 * @param {Object} newProduct -
 */
export function createProduct(newProduct) {
    if (!newProduct.id) {
        newProduct.id = `prod_${Date.now()}`;
    }
    const products = getProducts();
    products.push(newProduct);
    localStorage.setItem(DB_KEY, JSON.stringify(products));
}

/**
 * UPDATE: Actualiza un producto existente por su ID.
 * @param {string} id 
 * @param {Object} updatedData 
 */
export function updateProduct(id, updatedData) {
    let products = getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedData };
        localStorage.setItem(DB_KEY, JSON.stringify(products));
    }
}

/**
 * DELETE: Elimina un producto por su ID.
 * @param {string} id
 */
export function deleteProduct(id) {
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    localStorage.setItem(DB_KEY, JSON.stringify(products));
}