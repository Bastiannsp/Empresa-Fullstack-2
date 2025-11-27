package com.levelup.gamer.dto;

import com.levelup.gamer.model.PaymentType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class PaymentMethodRequest {

    @NotNull
    private PaymentType type;

    @NotBlank
    @Size(max = 80)
    private String provider;

    @NotBlank
    @Size(max = 100)
    private String holderName;

    @NotBlank
    @Pattern(regexp = "\\d{4}", message = "Debe ingresar los últimos 4 dígitos")
    private String lastFour;

    @Min(1)
    @Max(12)
    private Integer expirationMonth;

    @Min(2024)
    @Max(2100)
    private Integer expirationYear;

    private boolean defaultMethod;

    public PaymentType getType() {
        return type;
    }

    public void setType(PaymentType type) {
        this.type = type;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getHolderName() {
        return holderName;
    }

    public void setHolderName(String holderName) {
        this.holderName = holderName;
    }

    public String getLastFour() {
        return lastFour;
    }

    public void setLastFour(String lastFour) {
        this.lastFour = lastFour;
    }

    public Integer getExpirationMonth() {
        return expirationMonth;
    }

    public void setExpirationMonth(Integer expirationMonth) {
        this.expirationMonth = expirationMonth;
    }

    public Integer getExpirationYear() {
        return expirationYear;
    }

    public void setExpirationYear(Integer expirationYear) {
        this.expirationYear = expirationYear;
    }

    public boolean isDefaultMethod() {
        return defaultMethod;
    }

    public void setDefaultMethod(boolean defaultMethod) {
        this.defaultMethod = defaultMethod;
    }
}
