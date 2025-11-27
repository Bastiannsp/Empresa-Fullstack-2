import React from 'react';
import { Link } from 'react-router-dom';

function Nosotros() {
  return (
    <main id="contenido" className="py-4">
      <div className="container">
        <section className="text-center mb-5">
          <h1 className="display-6 fw-bold mb-3">Quiénes somos</h1>
          <p className="lead mb-0">Tienda online enfocada en gamers en Chile: consolas, PC y accesorios, con envíos a todo el país.</p>
        </section>

        <section className="row g-4 mb-5" aria-labelledby="titulo-mivi">
          <h2 id="titulo-mivi" className="h4">Misión y Visión</h2>
          <div className="col-md-6">
            <article className="card h-100">
              <div className="card-body">
                <h3 className="h5 mb-3">Nuestra misión</h3>
                <p className="mb-0">
                  Ofrecer productos de alta calidad para gamers en todo Chile y una experiencia de compra personalizada,
                  priorizando la satisfacción del cliente y el crecimiento de la comunidad.
                </p>
              </div>
            </article>
          </div>
          <div className="col-md-6">
            <article className="card h-100">
              <div className="card-body">
                <h3 className="h5 mb-3">Nuestra visión</h3>
                <p className="mb-0">
                  Ser la tienda online líder para gamers en Chile, destacando por innovación, servicio excepcional
                  y fidelización con elementos de gamificación.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="mb-5" aria-labelledby="titulo-valores">
          <h2 id="titulo-valores" className="h4">Nuestros valores</h2>
          <div className="row g-3">
            <div className="col-6 col-md-3"><span className="badge bg-primary w-100 py-2">Calidad</span></div>
            <div className="col-6 col-md-3"><span className="badge bg-primary w-100 py-2">Servicio</span></div>
            <div className="col-6 col-md-3"><span className="badge bg-primary w-100 py-2">Comunidad</span></div>
            <div className="col-6 col-md-3"><span className="badge bg-primary w-100 py-2">Innovación</span></div>
          </div>
        </section>

        <section className="mb-4 text-center">
          <h2 className="h4 mb-3">¿Tienes preguntas?</h2>
          <p className="mb-3">Escríbenos para conocer más sobre nuestros productos y servicios.</p>
          <Link to="/contacto" className="btn btn-primary">Ir a Contacto</Link>
        </section>
      </div>
    </main>
  );
}
export default Nosotros;