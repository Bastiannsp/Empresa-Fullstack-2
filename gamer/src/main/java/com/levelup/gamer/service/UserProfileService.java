package com.levelup.gamer.service;

import com.levelup.gamer.dto.PaymentMethodRequest;
import com.levelup.gamer.dto.PaymentMethodResponse;
import com.levelup.gamer.dto.UpdateUserProfileRequest;
import com.levelup.gamer.dto.UserProfileResponse;
import com.levelup.gamer.model.PaymentMethod;
import com.levelup.gamer.model.User;
import com.levelup.gamer.repository.PaymentMethodRepository;
import com.levelup.gamer.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserProfileService {

    private final UserRepository userRepository;
    private final PaymentMethodRepository paymentMethodRepository;

    public UserProfileService(UserRepository userRepository, PaymentMethodRepository paymentMethodRepository) {
        this.userRepository = userRepository;
        this.paymentMethodRepository = paymentMethodRepository;
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getProfile(String username) {
        User user = loadUser(username);
        return mapToResponse(user);
    }

    public UserProfileResponse updateProfile(String username, UpdateUserProfileRequest request) {
        User user = loadUser(username);
        user.setEmail(request.getEmail() != null ? request.getEmail().trim() : null);
        user.setFullName(request.getFullName() != null ? request.getFullName().trim() : null);
        user.setPhone(request.getPhone() != null ? request.getPhone().trim() : null);
        user.setAddress(request.getAddress() != null ? request.getAddress().trim() : null);
        userRepository.save(user);
        return mapToResponse(user);
    }

    public PaymentMethodResponse createPaymentMethod(String username, PaymentMethodRequest request) {
        User user = loadUser(username);
        if (request.isDefaultMethod()) {
            paymentMethodRepository.clearDefaultForUser(user);
        }
        PaymentMethod paymentMethod = new PaymentMethod();
        paymentMethod.setUser(user);
        paymentMethod.setType(request.getType());
        paymentMethod.setProvider(request.getProvider());
        paymentMethod.setHolderName(request.getHolderName());
        paymentMethod.setLastFour(request.getLastFour());
        paymentMethod.setExpirationMonth(request.getExpirationMonth());
        paymentMethod.setExpirationYear(request.getExpirationYear());
        paymentMethod.setDefaultMethod(request.isDefaultMethod());
        PaymentMethod saved = paymentMethodRepository.save(paymentMethod);
        return mapPaymentMethod(saved);
    }

    public PaymentMethodResponse updatePaymentMethod(String username, Long methodId, PaymentMethodRequest request) {
        User user = loadUser(username);
        PaymentMethod paymentMethod = paymentMethodRepository.findByIdAndUser(methodId, user)
                .orElseThrow(() -> new EntityNotFoundException("Método de pago no encontrado"));
        if (request.isDefaultMethod()) {
            paymentMethodRepository.clearDefaultForUser(user);
        }
        paymentMethod.setType(request.getType());
        paymentMethod.setProvider(request.getProvider());
        paymentMethod.setHolderName(request.getHolderName());
        paymentMethod.setLastFour(request.getLastFour());
        paymentMethod.setExpirationMonth(request.getExpirationMonth());
        paymentMethod.setExpirationYear(request.getExpirationYear());
        paymentMethod.setDefaultMethod(request.isDefaultMethod());
        PaymentMethod saved = paymentMethodRepository.save(paymentMethod);
        return mapPaymentMethod(saved);
    }

    public void deletePaymentMethod(String username, Long methodId) {
        User user = loadUser(username);
        PaymentMethod paymentMethod = paymentMethodRepository.findByIdAndUser(methodId, user)
                .orElseThrow(() -> new EntityNotFoundException("Método de pago no encontrado"));
        paymentMethodRepository.delete(paymentMethod);
    }

    public PaymentMethodResponse markDefault(String username, Long methodId) {
        User user = loadUser(username);
        PaymentMethod paymentMethod = paymentMethodRepository.findByIdAndUser(methodId, user)
                .orElseThrow(() -> new EntityNotFoundException("Método de pago no encontrado"));
        paymentMethodRepository.clearDefaultForUser(user);
        paymentMethod.setDefaultMethod(true);
        PaymentMethod saved = paymentMethodRepository.save(paymentMethod);
        return mapPaymentMethod(saved);
    }

    @Transactional(readOnly = true)
    public List<PaymentMethodResponse> listPaymentMethods(String username) {
        User user = loadUser(username);
        return paymentMethodRepository.findByUserOrderByDefaultMethodDescIdAsc(user)
                .stream()
                .map(this::mapPaymentMethod)
                .collect(Collectors.toList());
    }

    private User loadUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));
    }

    private UserProfileResponse mapToResponse(User user) {
        UserProfileResponse response = new UserProfileResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setAddress(user.getAddress());
        response.setPaymentMethods(
                paymentMethodRepository.findByUserOrderByDefaultMethodDescIdAsc(user)
                        .stream()
                        .map(this::mapPaymentMethod)
                        .collect(Collectors.toList())
        );
        return response;
    }

    private PaymentMethodResponse mapPaymentMethod(PaymentMethod paymentMethod) {
        PaymentMethodResponse response = new PaymentMethodResponse();
        response.setId(paymentMethod.getId());
        response.setType(paymentMethod.getType());
        response.setProvider(paymentMethod.getProvider());
        response.setHolderName(paymentMethod.getHolderName());
        response.setLastFour(paymentMethod.getLastFour());
        response.setExpirationMonth(paymentMethod.getExpirationMonth());
        response.setExpirationYear(paymentMethod.getExpirationYear());
        response.setDefaultMethod(paymentMethod.isDefaultMethod());
        return response;
    }
}
