const DB_KEY = 'level-up-gamer-products';
const initialProducts = [];

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