package com.levelup.gamer.controller;

import com.levelup.gamer.dto.PaymentMethodRequest;
import com.levelup.gamer.dto.PaymentMethodResponse;
import com.levelup.gamer.dto.UpdateUserProfileRequest;
import com.levelup.gamer.dto.UserProfileResponse;
import com.levelup.gamer.service.UserProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Perfil de usuario", description = "Consultas y configuración de la cuenta del usuario")
@SecurityRequirement(name = "bearer-jwt")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserProfileService userProfileService;

    public UserController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping("/me")
    @Operation(summary = "Obtener perfil", description = "Devuelve los datos del usuario autenticado")
    public ResponseEntity<UserProfileResponse> getProfile(Authentication authentication) {
        return ResponseEntity.ok(userProfileService.getProfile(authentication.getName()));
    }

    @PutMapping("/me")
    @Operation(summary = "Actualizar perfil", description = "Actualiza datos de contacto del usuario")
    public ResponseEntity<UserProfileResponse> updateProfile(Authentication authentication,
                                                             @Valid @RequestBody UpdateUserProfileRequest request) {
        return ResponseEntity.ok(userProfileService.updateProfile(authentication.getName(), request));
    }

    @GetMapping("/me/payment-methods")
    @Operation(summary = "Listar métodos de pago", description = "Obtiene los métodos de pago guardados del usuario")
    public ResponseEntity<List<PaymentMethodResponse>> listPaymentMethods(Authentication authentication) {
        return ResponseEntity.ok(userProfileService.listPaymentMethods(authentication.getName()));
    }

    @PostMapping("/me/payment-methods")
    @Operation(summary = "Crear método de pago", description = "Registra un nuevo método de pago")
    public ResponseEntity<PaymentMethodResponse> createPaymentMethod(Authentication authentication,
                                                                     @Valid @RequestBody PaymentMethodRequest request) {
        return ResponseEntity.ok(userProfileService.createPaymentMethod(authentication.getName(), request));
    }

    @PutMapping("/me/payment-methods/{id}")
    @Operation(summary = "Actualizar método de pago", description = "Actualiza los datos de un método de pago existente")
    public ResponseEntity<PaymentMethodResponse> updatePaymentMethod(Authentication authentication,
                                                                     @PathVariable Long id,
                                                                     @Valid @RequestBody PaymentMethodRequest request) {
        return ResponseEntity.ok(userProfileService.updatePaymentMethod(authentication.getName(), id, request));
    }

    @DeleteMapping("/me/payment-methods/{id}")
    @Operation(summary = "Eliminar método de pago", description = "Elimina un método de pago guardado")
    public ResponseEntity<Void> deletePaymentMethod(Authentication authentication,
                                                    @PathVariable Long id) {
        userProfileService.deletePaymentMethod(authentication.getName(), id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/me/payment-methods/{id}/default")
    @Operation(summary = "Marcar método de pago principal", description = "Establece el método como predeterminado")
    public ResponseEntity<PaymentMethodResponse> markDefault(Authentication authentication,
                                                             @PathVariable Long id) {
        return ResponseEntity.ok(userProfileService.markDefault(authentication.getName(), id));
    }
}
