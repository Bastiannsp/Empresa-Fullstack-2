import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../database';
import { useCart } from '../context/CartContext';

const clp = (n) => n.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

function ProductDetail() {
  const { id } = useParams();
  
  const product = getProductById(id);
  
  const { agregarProducto } = useCart();

  if (!product) {
    return (
      <div className="container my-5 text-center">
        <h2 className="display-4">Producto no encontrado</h2>
        <p className="lead">El producto que buscas no existe.</p>
        <Link to="/productos" className="btn btn-primary">
          ← Volver a productos
        </Link>
      </div>
    );
  }
  return (
    <main className="container my-5">
      <Link to="/productos" className="btn btn-secondary mb-4">
        ← Volver a productos
      </Link>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-lg">
            <div className="row g-0">
              <div className="col-md-5">
                <img 
                  src={`/${product.imagen}`}
                  className="img-fluid rounded-start" 
                  alt={product.nombre}
                />
              </div>
              <div className="col-md-7">
                <div className="card-body d-flex flex-column h-100 p-4">
                  <h3 className="card-title h2">{product.nombre}</h3>
                  <p className="card-text"><strong>Categoría:</strong> {product.categoria}</p>
                  <p className="card-text h4 text-primary fw-bold">{clp(product.precio)}</p>
                  <p className="card-text"><strong>Unidades vendidas:</strong> {product.vendidos}</p>
                  <p className="card-text mt-3">{product.descripcion}</p>
                  <button
                    className="btn btn-success mt-auto"
                    onClick={() => agregarProducto(product.id, product.nombre, product.precio,product.imagen)}
                  >
                    🛒 Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;