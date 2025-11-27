// src/test/Login.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import Login from '../components/Login';

const renderWithProviders = (component, { authValue } = {}) => {
  const defaultAuthValue = {
    user: null,
    token: null,
    role: null,
    loading: false,
    isAuthenticated: false,
    isAdmin: false,
    isUser: false,
    permissions: {
      canViewCatalog: false,
      canCheckout: false,
      canAccessAdmin: false,
      canManageCatalog: false
    },
    hasRole: () => false,
    hasAnyRole: () => false,
    login: () => Promise.reject({ response: { data: { error: 'Credenciales inválidas' } } }),
    register: () => Promise.resolve(),
    logout: () => {}
  };

  return render(
    <CartProvider>
      <BrowserRouter>
        <AuthContext.Provider value={{ ...defaultAuthValue, ...authValue }}>
          {component}
        </AuthContext.Provider>
      </BrowserRouter>
    </CartProvider>
  );
};

describe('Componente Login', () => {

  // Limpiamos el localStorage antes de cada prueba
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe mostrar un error si las credenciales son incorrectas', async () => {
    const user = userEvent.setup();
    const loginMock = jasmine.createSpy('login').and.returnValue(Promise.reject({ response: { data: { error: 'Credenciales inválidas' } } }));

    renderWithProviders(<Login />, { authValue: { login: loginMock } });

    const usernameInput = screen.getByLabelText(/Usuario o correo/i);
    const passInput = screen.getByLabelText(/Contraseña/i);
    const btn = screen.getByRole('button', { name: /Ingresar/i });

    await user.type(usernameInput, "user@test.com");
    await user.type(passInput, "contraseña-mala");
    await user.click(btn);

    const errorMessage = await screen.findByText(/Credenciales inválidas/i);
    expect(errorMessage).toBeTruthy();
    expect(loginMock).toHaveBeenCalled();
  });
});