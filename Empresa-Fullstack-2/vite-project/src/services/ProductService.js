import axios from 'axios';
const API_URL = 'http://localhost:8080/api/products';

class ProductService {
    
    // Obtener todos los productos
    getAllProducts() {
        return axios.get(API_URL);
    }

    // Obtener un producto por ID
    getProductById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    // Crear producto
    createProduct(product) {
        return axios.post(API_URL, product);
    }

    // Actualizar producto
    updateProduct(id, product) {
        return axios.put(`${API_URL}/${id}`, product);
    }

    // Borrar producto
    deleteProduct(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new ProductService();