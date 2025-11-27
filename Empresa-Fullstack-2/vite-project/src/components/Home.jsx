import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../services/ProductService';
import ProductCard from './ProductCard';

function Home() {
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const seleccionarDestacados = useMemo(() => (productos) => {
    if (!Array.isArray(productos) || productos.length === 0) {
      return [];
    }
    const ordenados = [...productos].sort((a, b) => (b.vendidos ?? 0) - (a.vendidos ?? 0));
    return ordenados.slice(0, 4);
  }, []);

  useEffect(() => {
    let activo = true;

    ProductService.getAllProducts()
      .then((response) => {
        if (!activo) return;
        setDestacados(seleccionarDestacados(response.data));
        setError(null);
      })
      .catch((err) => {
        console.error('No pudimos cargar los productos destacados', err);
        if (!activo) return;
        setDestacados([]);
        setError('No pudimos cargar los productos destacados.');
      })
      .finally(() => {
        if (activo) {
          setLoading(false);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  return (
    <main className="container py-4">
      {}
      <section className="row align-items-center mb-5">
        <div className="col-md-7">
          <h1 className="display-4 fw-bold">BIENVENIDO a <span className="text-primary">LEVEL-UP GAMER</span></h1>
          <p className="lead">Encuentra productos seleccionados a los mejores precios.</p>
          <div className="d-flex gap-2">
            <Link className="btn btn-primary" to="/productos">
              Ver productos
            </Link>
            <Link className="btn btn-outline-secondary" to="/contacto">
              Contáctanos
            </Link>
          </div>
        </div>
        <div className="col-md-5 d-none d-md-block">
          {}
          <img 
            src="img/lgamer.jpg" 
            alt="img/lgamer.jpg" 
            className="img-fluid rounded" 
          />
        </div>
      </section>
      {}
      <section>
        <h2 className="h4 mb-3">Productos destacados</h2>
        {error && <p className="text-danger small">{error}</p>}
        {loading && <p>Cargando destacados...</p>}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
          {!loading && destacados.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;