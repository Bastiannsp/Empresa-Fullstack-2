package com.levelup.gamer.service;

import com.levelup.gamer.exception.ProductNotFoundException;
import com.levelup.gamer.model.Product;
import com.levelup.gamer.repository.ProductRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Product getProductById(long id) {
        return productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }

    public Product createProduct(Product product) {
        if (product.getVendidos() == null) {
            product.setVendidos(0);
        }
        return productRepository.save(product);
    }

    public Product updateProduct(long id, Product productDetails) {
        Product existingProduct = getProductById(id);

        existingProduct.setNombre(productDetails.getNombre());
        existingProduct.setCategoria(productDetails.getCategoria());
        existingProduct.setPrecio(productDetails.getPrecio());
        existingProduct.setImagen(productDetails.getImagen());
        existingProduct.setDescripcion(productDetails.getDescripcion());
        if (productDetails.getVendidos() != null) {
            existingProduct.setVendidos(productDetails.getVendidos());
        }

        return productRepository.save(existingProduct);
    }

    public void deleteProduct(long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException(id);
        }
        productRepository.deleteById(id);
    }
}