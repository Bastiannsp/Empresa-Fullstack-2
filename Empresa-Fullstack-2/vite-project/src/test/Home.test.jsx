// src/test/Home.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { BrowserRouter } from 'react-router-dom';
import Home from '../components/Home';

// Función helper para renderizar con contexto
const renderWithProviders = (component) => {
  return render(
    <CartProvider>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </CartProvider>
  );
};

// En Jasmine, 'describe' e 'it' son globales
describe('Componente Home', () => {

  it('debe mostrar el mensaje de bienvenida', () => {
    renderWithProviders(<Home />);
    
    // Buscamos el encabezado
    // Nota: Usamos una expresión regular /texto/i para que no importen las mayúsculas/minúsculas
    const welcomeMessage = screen.getByRole('heading', { 
      level: 1, 
      name: /BIENVENIDO a LEVEL-UP GAMER/i 
    });

    // En Jasmine usamos 'toBeTruthy' para verificar que el elemento existe
    expect(welcomeMessage).toBeTruthy();
  });

  it('debe mostrar el botón "Ver productos"', () => {
    renderWithProviders(<Home />);
    
    const productButton = screen.getByRole('link', { name: /Ver productos/i });

    expect(productButton).toBeTruthy();
    // Verificamos que el enlace lleve a la ruta correcta
    expect(productButton.getAttribute('href')).toBe('/productos');
  });
});