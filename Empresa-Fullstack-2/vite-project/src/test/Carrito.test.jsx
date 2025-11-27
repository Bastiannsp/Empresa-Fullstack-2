// src/test/Carrito.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { BrowserRouter } from 'react-router-dom';
import Carrito from '../components/Carrito';

const renderWithProviders = (component) => {
  return render(
    <CartProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </CartProvider>
  );
};

describe('Componente Carrito', () => {
  it('18. Debe mostrar mensaje cuando está vacío', () => {
    renderWithProviders(<Carrito />);
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeTruthy();
  });

  it('19. Debe mostrar botón para volver a la tienda', () => {
    renderWithProviders(<Carrito />);
    const link = screen.getByRole('link', { name: /Volver a la tienda/i });
    expect(link).toBeTruthy();
  });
});