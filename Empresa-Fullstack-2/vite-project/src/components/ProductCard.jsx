import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
const clp = (n) => n.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
function ProductCard({ product }) {
  const { agregarProducto } = useCart();

  const handleAddToCart = () => {
    agregarProducto(product.id, product.nombre, product.precio);
  };

  return (
    <div className="col">
      <article className="card h-100 shadow-sm">
        <img src={product.imagen} className="card-img-top" alt={product.nombre} />
        <div className="card-body d-flex flex-column">
          <h3 className="h5 card-title">{product.nombre}</h3>
          {}
          <p className="card-text text-secondary small">Categoría: {product.categoria}</p>
          <p className="card-text text-secondary small">Unidades vendidas: {product.vendidos}</p>
          <p className="fw-semibold text-primary mb-3 h5">{clp(product.precio)}</p>

          <div className="mt-auto d-flex flex-column gap-2">
            {}
            <button 
              className="btn btn-success" 
              onClick={handleAddToCart}
            >
              Agregar al carrito
            </button>
            
            {}
            <Link 
              to={`/productos/${product.id}`} 
              className="btn btn-primary"
            >
              Ver producto
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export default ProductCard;