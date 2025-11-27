// src/test/Footer.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Componente Footer', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  });

  it('6. Debe mostrar el texto de derechos reservados', () => {
    expect(screen.getByText(/Todos los derechos reservados/i)).toBeTruthy();
  });

  it('7. Debe mostrar la sección de Contacto', () => {
    expect(screen.getByRole('heading', { name: /Contacto/i })).toBeTruthy();
  });

  it('8. Debe contener el email de soporte', () => {
    expect(screen.getByText(/soporte@levelupgamer.com/i)).toBeTruthy();
  });
});