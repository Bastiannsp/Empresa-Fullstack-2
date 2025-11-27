// src/test/Registro.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Registro from '../components/Registro';

describe('Componente Registro', () => {
  const renderComp = () => render(<BrowserRouter><Registro /></BrowserRouter>);

  it('16. Debe renderizar inputs de registro', () => {
    renderComp();
    expect(screen.getByLabelText(/Nombre/i)).toBeTruthy();
    expect(screen.getByLabelText(/Fecha de nacimiento/i)).toBeTruthy();
  });

  it('17. Debe mostrar error si es menor de edad', async () => {
    const user = userEvent.setup();
    renderComp();

    // Llenamos fecha actual (0 años)
    const fechaInput = screen.getByLabelText(/Fecha de nacimiento/i);
    await user.type(fechaInput, "2024-01-01"); // Ajusta según año actual
    
    // Llenamos otros para que no falle por "required" del navegador
    await user.type(screen.getByLabelText(/Nombre/i), "Niño");
    await user.type(screen.getByLabelText(/Email/i), "nino@test.com");
    await user.type(screen.getByLabelText(/Contraseña/i), "123");

    const btn = screen.getByRole('button', { name: /Registrarse/i });
    await user.click(btn);

    expect(screen.getByText(/Debes ser mayor de edad/i)).toBeTruthy();
  });
});