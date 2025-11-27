package com.levelup.gamer.dto;

public class AuthResponse {

    private final String token;
    private final String username;
    private final String role;
    private final String fullName;
    private final String email;

    public AuthResponse(String token, String username, String role, String fullName, String email) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.fullName = fullName;
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }
}
