import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../database';
import ProductCard from './ProductCard';

function Home() {
  const [destacados, setDestacados] = useState([]);
  const idsDestacados = ["PP002", "PP003", "PP004", "PP005"];

  useEffect(() => {
    const allProducts = getProducts();
    const productosDestacados = allProducts.filter(p => idsDestacados.includes(p.id));
    setDestacados(productosDestacados);
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
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
          {destacados.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;