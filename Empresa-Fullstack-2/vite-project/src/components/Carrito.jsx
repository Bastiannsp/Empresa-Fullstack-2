import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Carrito() {
  const { 
    carrito, 
    eliminarProducto, 
    cambiarCantidad, 
    vaciarCarrito, 
    totalPrecio 
  } = useCart();
  
  const navigate = useNavigate();
  const { permissions } = useAuth();
  const canCheckout = permissions.canCheckout;

  const fmtCLP = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
  const handleCheckout = () => {
    if (canCheckout) {
      navigate('/checkout');
    } else {
      alert('Debes iniciar sesión para proceder al pago.');
      navigate('/login');
    }
  };
  if (carrito.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2 className="mb-3">Tu carrito está vacío</h2>
        <p className="lead mb-4">Añade productos desde la tienda para verlos aquí.</p>
        <Link to="/productos" className="btn btn-primary">
          ← Volver a la tienda
        </Link>
      </div>
    );
  }
  return (
    <main className="container my-4">
      <h2 className="mb-3">Tu carrito</h2>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th style={{ width: '200px' }}>Cantidad</th>
              <th>Subtotal</th>
              <th>Acción</th>
            </tr>
          </thead>
          {}
          <tbody id="carritoItems">
            {carrito.map((item) => {
              const imagen = item.imagen;
              const imagenSrc = imagen
                ? (imagen.startsWith('http') ? imagen : (imagen.startsWith('/') ? imagen : `/${imagen}`))
                : '/img/logo.png';

              return (
                <tr key={item.id}>
                  <td>
                    {}
                    <img 
                      src={imagenSrc} 
                      alt={item.nombre} 
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                    />
                  </td>
                  <td>{item.nombre}</td>
                  <td className="text-nowrap">
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => cambiarCantidad(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="mx-2">{item.cantidad}</span>
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => cambiarCantidad(item.id, +1)}
                    >
                      +
                    </button>
                  </td>
                  <td>{fmtCLP.format(item.precio * item.cantidad)}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => eliminarProducto(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {}
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <button 
          className="btn btn-outline-danger"
          onClick={vaciarCarrito}
        >
          Vaciar carrito
        </button>
        <h4 className="mb-0">Total: {fmtCLP.format(totalPrecio)}</h4>
      </div>

      <div className="mt-4 d-flex gap-2">
        <Link to="/productos" className="btn btn-secondary">
          ← Seguir comprando
        </Link>
        <button 
          className="btn btn-success"
          onClick={handleCheckout}
        >
          Proceder al pago 💳
        </button>
      </div>
    </main>
  );
}

export default Carrito;