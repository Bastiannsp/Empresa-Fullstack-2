import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const credentials = { username: username.trim(), password };
      await login(credentials);
      setMensaje({ tipo: 'success', texto: '✅ Sesión iniciada. Redirigiendo...' });
      setTimeout(() => navigate('/'), 1200);
    } catch (error) {
      const apiMessage = error?.response?.data?.error || '❌ Credenciales inválidas.';
      setMensaje({ tipo: 'danger', texto: apiMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <form onSubmit={handleSubmit} className="p-4 border rounded-3 bg-light shadow">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Usuario o correo</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="tu_usuario"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>
            <button type="submit" className="btn btn-dark w-100" disabled={submitting}>
              {submitting ? 'Ingresando...' : 'Ingresar'}
            </button>
            {mensaje && (
              <p className={`mt-3 text-center text-${mensaje.tipo}`}>
                {mensaje.texto}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;