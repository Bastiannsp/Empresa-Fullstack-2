// src/test/Contacto.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contacto from '../components/Contacto';

describe('Componente Contacto', () => {
  it('13. Debe renderizar los campos del formulario', () => {
    render(<Contacto />);
    expect(screen.getByLabelText(/Nombre/i)).toBeTruthy();
    expect(screen.getByLabelText(/Correo/i)).toBeTruthy();
    expect(screen.getByLabelText(/Mensaje/i)).toBeTruthy();
  });

  it('14. Debe mostrar error si se envía vacío', async () => {
    const user = userEvent.setup();
    render(<Contacto />);
    
    const btn = screen.getByRole('button', { name: /Enviar/i });
    await user.click(btn);

    expect(screen.getByText(/Todos los campos son obligatorios/i)).toBeTruthy();
  });

  it('15. Debe mostrar éxito si se llena correctamente', async () => {
    const user = userEvent.setup();
    render(<Contacto />);
    
    await user.type(screen.getByLabelText(/Nombre/i), "Juan");
    await user.type(screen.getByLabelText(/Correo/i), "juan@test.com");
    await user.type(screen.getByLabelText(/Mensaje/i), "Hola");
    
    await user.click(screen.getByRole('button', { name: /Enviar/i }));

    expect(screen.getByText(/Formulario enviado correctamente/i)).toBeTruthy();
  });
});