// src/test/AdminProducts.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminProducts from '../components/AdminProducts';

describe('Componente AdminProducts', () => {
  it('20. Debe mostrar el título de agregar producto', () => {
    render(<AdminProducts />);
    expect(screen.getByText(/Agregar Nuevo Producto/i)).toBeTruthy();
  });

  it('21. Debe tener inputs para nombre y precio', () => {
    render(<AdminProducts />);
    expect(screen.getByLabelText(/^Nombre$/i)).toBeTruthy(); // ^$ para coincidencia exacta
    expect(screen.getByLabelText(/Precio/i)).toBeTruthy();
  });

  it('22. Debe mostrar la tabla de inventario', () => {
    render(<AdminProducts />);
    expect(screen.getByText(/Inventario Actual/i)).toBeTruthy();
  });
});