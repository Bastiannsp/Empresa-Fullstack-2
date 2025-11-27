package com.levelup.gamer.repository;

import com.levelup.gamer.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // ¡Listo! No necesitas escribir nada más.
    // Spring Data JPA ya creó los métodos mágicos para guardar y buscar.
}