import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Checkout() {
  const { carrito, totalPrecio, vaciarCarrito } = useCart();
  const { permissions, user } = useAuth();
  const canCheckout = permissions.canCheckout;
  const navigate = useNavigate();
  const fmtCLP = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
  useEffect(() => {
    if (!canCheckout) {
      navigate('/login');
    }
  }, [canCheckout, navigate]);
  const handleConfirmOrder = () => {
    const newOrder = {
      id: `order_${Date.now()}`,
      fecha: new Date().toISOString(),
      userEmail: user?.username || 'usuario',
      items: carrito,
      total: totalPrecio
    };
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    allOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(allOrders));
    vaciarCarrito();
    navigate('/confirmacion');
  };

  return (
    <div className="container my-5" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4">Finalizar Compra</h2>
      
      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Resumen de tu Pedido</h5>
        </div>
        <ul className="list-group list-group-flush">
          {carrito.map(item => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h6 className="my-0">{item.nombre}</h6>
                <small className="text-muted">Cantidad: {item.cantidad}</small>
              </div>
              <span className="text-muted">{fmtCLP.format(item.precio * item.cantidad)}</span>
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between">
            <strong>Total (CLP)</strong>
            <strong>{fmtCLP.format(totalPrecio)}</strong>
          </li>
        </ul>
      </div>

      {}
      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h5 className="card-title">Simulación de Pago</h5>
          <p className="card-text">Este es un proyecto de demostración. Al hacer clic en "Confirmar", la orden se guardará localmente.</p>
          <button 
            className="btn btn-success w-100 btn-lg"
            onClick={handleConfirmOrder}
          >
            Confirmar Compra y Pagar
          </button>
        </div>
      </div>
      
      <Link to="/carrito" className="btn btn-outline-secondary mt-3">
        ← Volver al carrito
      </Link>
    </div>
  );
}

export default Checkout;