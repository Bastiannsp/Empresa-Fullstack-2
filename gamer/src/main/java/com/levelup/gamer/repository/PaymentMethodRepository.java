package com.levelup.gamer.repository;

import com.levelup.gamer.model.PaymentMethod;
import com.levelup.gamer.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {

    List<PaymentMethod> findByUserOrderByDefaultMethodDescIdAsc(User user);

    Optional<PaymentMethod> findByIdAndUser(Long id, User user);

    @Modifying
    @Query("update PaymentMethod pm set pm.defaultMethod = false where pm.user = :user")
    void clearDefaultForUser(@Param("user") User user);
}
