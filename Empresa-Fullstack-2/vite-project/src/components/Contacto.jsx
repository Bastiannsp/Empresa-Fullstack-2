import React, { useState } from 'react';

function Contacto() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [alerta, setAlerta] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre === "" || correo === "" || mensaje === "") {
      setAlerta({ tipo: 'danger', texto: 'Todos los campos son obligatorios' });
    } else {
      setAlerta({ tipo: 'success', texto: 'Formulario enviado correctamente ✅' });
      setNombre('');
      setCorreo('');
      setMensaje('');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <h2>Formulario de Contacto</h2>
      <form id="formContacto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input 
            type="text" 
            className="form-control" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input 
            type="email" 
            className="form-control" 
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea 
            className="form-control" 
            rows="4"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
      {alerta && (
        <div className={`alert alert-${alerta.tipo} mt-3`}>
          {alerta.texto}
        </div>
      )}
    </div>
  );
}
export default Contacto;