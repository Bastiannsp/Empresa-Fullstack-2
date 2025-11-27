import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductService from '../services/ProductService';
import { useCart } from '../context/CartContext';

const clp = (n) => n.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { agregarProducto } = useCart();

  useEffect(() => {
    let activo = true;
    setLoading(true);
    setError(null);

    ProductService.getProductById(id)
      .then((response) => {
        if (!activo) return;
        setProduct(response.data);
      })
      .catch((err) => {
        console.error(`No pudimos cargar el producto ${id}`, err);
        if (!activo) return;
        setError('Producto no encontrado o inaccesible.');
        setProduct(null);
      })
      .finally(() => {
        if (activo) {
          setLoading(false);
        }
      });

    return () => {
      activo = false;
    };
  }, [id]);

  const imageSrc = useMemo(() => {
    if (!product?.imagen) {
      return undefined;
    }
    if (product.imagen.startsWith('http')) {
      return product.imagen;
    }
    return product.imagen.startsWith('/') ? product.imagen : `/${product.imagen}`;
  }, [product?.imagen]);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container my-5 text-center">
        <h2 className="display-4">Producto no encontrado</h2>
        <p className="lead">{error ?? 'El producto que buscas no existe.'}</p>
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
                  src={imageSrc}
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
                    onClick={() => agregarProducto(product.id, product.nombre, product.precio, imageSrc ?? product.imagen)}
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