import React from 'react';
import { Link } from 'react-router-dom';

function Confirmacion() {
  return (
    <div className="container my-5 text-center">
      <div className="py-5">
        <h1 className="display-4 text-success">¡Gracias por tu compra! 🎉</h1>
        <p className="lead">Tu pedido ha sido procesado exitosamente.</p>
        <hr className="my-4" />
        <p>Hemos guardado tu orden en el almacenamiento local.</p>
        <Link className="btn btn-primary btn-lg" to="/productos">
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}

export default Confirmacion;