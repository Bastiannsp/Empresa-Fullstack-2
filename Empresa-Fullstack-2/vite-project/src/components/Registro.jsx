import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const navigate = useNavigate(); 
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const m = hoy.getMonth() - fechaNac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    if (edad < 18) {
      setMensaje({ tipo: 'danger', texto: '❌ Debes ser mayor de edad para registrarte.' });
      return;
    }
    const descuento = email.endsWith("@ducouc.cl");

    try {
      setSubmitting(true);
      await register({ username: email.trim(), password, role: 'ROLE_USER' });
      const extra = descuento ? 'Tienes descuento 🎉' : '';
      setMensaje({ tipo: 'success', texto: `✅ ¡Registro exitoso, ${nombre}! ${extra}`.trim() });
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      const apiMessage = error?.response?.data?.error || '❌ No se pudo completar el registro.';
      setMensaje({ tipo: 'danger', texto: apiMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de nacimiento</label>
          <input
            type="date"
            className="form-control"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      {mensaje && (
        <div className={`alert alert-${mensaje.tipo} mt-3`}>
          {mensaje.texto}
        </div>
      )}
    </div>
  );
}

export default Registro;