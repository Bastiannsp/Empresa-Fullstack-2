// src/test/NavBar.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../components/NavBar';

const renderWithProviders = (component) => {
  return render(
    <CartProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </CartProvider>
  );
};

describe('Componente NavBar', () => {
  beforeEach(() => {
    renderWithProviders(<NavBar />);
  });

  it('1. Debe mostrar la marca LEVEL-UP GAMER', () => {
    expect(screen.getByText(/LEVEL-UP GAMER/i)).toBeTruthy();
  });

  it('2. Debe tener un enlace al Home', () => {
    const link = screen.getByRole('link', { name: /Home/i });
    expect(link).toBeTruthy();
  });

  it('3. Debe tener un enlace a Productos', () => {
    const link = screen.getByRole('link', { name: /Productos/i });
    expect(link).toBeTruthy();
  });

  it('4. Debe tener un enlace a Registro', () => {
    const link = screen.getByRole('link', { name: /Registro/i });
    expect(link).toBeTruthy();
  });

  it('5. Debe mostrar el icono del carrito', () => {
    // Buscamos por el texto que contiene el emoji o el span
    expect(screen.getByText(/🛒/i)).toBeTruthy();
  });
});