package com.levelup.gamer.dto;

import com.levelup.gamer.model.Role;
import jakarta.validation.constraints.NotBlank;

public class RegisterRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    private Role role = Role.ROLE_USER;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
