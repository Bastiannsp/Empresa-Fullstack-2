// src/test/ProductCard.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const mockProduct = {
  id: '1',
  nombre: 'Producto de Prueba',
  precio: 10000,
  imagen: 'img/test.jpg',
  categoria: 'Test',
  vendidos: 5
};

const renderWithProviders = (component) => {
  return render(
    <CartProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </CartProvider>
  );
};

describe('Componente ProductCard', () => {
  beforeEach(() => {
    renderWithProviders(<ProductCard product={mockProduct} />);
  });

  it('9. Debe mostrar el nombre del producto', () => {
    expect(screen.getByText('Producto de Prueba')).toBeTruthy();
  });

  it('10. Debe mostrar el precio formateado', () => {
    // El formateador CL pone $ y puntos
    expect(screen.getByText(/\$10.000/i)).toBeTruthy();
  });

  it('11. Debe mostrar el botón de Agregar al carrito', () => {
    const btn = screen.getByRole('button', { name: /Agregar al carrito/i });
    expect(btn).toBeTruthy();
  });

  it('12. Debe mostrar el enlace para Ver producto', () => {
    const link = screen.getByRole('link', { name: /Ver producto/i });
    expect(link.getAttribute('href')).toBe('/productos/1');
  });
});