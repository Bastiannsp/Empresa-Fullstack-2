package com.levelup.gamer.controller;

import com.levelup.gamer.model.Product;
import com.levelup.gamer.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Productos", description = "Operaciones CRUD sobre el catálogo de productos")
@SecurityRequirement(name = "bearer-jwt")
@CrossOrigin(origins = "*") // ¡Permite que React se conecte desde cualquier puerto!
public class ProductController {

    @Autowired
    private ProductService productService;

    // GET: Traer todos los productos
    @GetMapping
    @Operation(summary = "Obtener todos los productos", description = "Devuelve la lista completa de productos disponibles")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // GET: Traer un producto por ID
    @GetMapping("/{id}")
    @Operation(summary = "Obtener un producto", description = "Busca un producto por su identificador")
    public Product getProductById(@PathVariable long id) {
        return productService.getProductById(id);
    }

    // POST: Crear un nuevo producto
    @PostMapping
    @Operation(summary = "Crear un producto", description = "Registra un nuevo producto en el catálogo")
    @PreAuthorize("hasRole('ADMIN')")
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    // PUT: Actualizar un producto existente
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un producto", description = "Modifica los datos de un producto existente")
    @PreAuthorize("hasRole('ADMIN')")
    public Product updateProduct(@PathVariable long id, @RequestBody Product productDetails) {
        return productService.updateProduct(id, productDetails);
    }

    // DELETE: Borrar un producto
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un producto", description = "Elimina un producto del catálogo")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProduct(@PathVariable long id) {
        productService.deleteProduct(id);
    }
}