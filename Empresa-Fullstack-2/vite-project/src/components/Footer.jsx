import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-4">
        <div className="row gy-3">
          <div className="col-md">
            <h6 className="text-uppercase mb-3">Tienda LEVEL-UP GAMER</h6>
            <p className="mb-1">LEVEL-UP GAMER</p>
            <p className="mb-0">© 2025. Todos los derechos reservados.</p>
          </div>
          <div className="col-md">
            <h6 className="text-uppercase mb-3">Secciones</h6>
            <ul className="list-unstyled mb-0">
              <li><a className="link-light text-decoration-none" href="estadisticas.html">Productos</a></li>
              <li><a className="link-light text-decoration-none" href="contacto.html">Contacto</a></li>
            </ul>
          </div>
          <div className="col-md">
            <h6 className="text-uppercase mb-3">Contacto</h6>
            <address className="mb-1">Santiago, Chile</address>
            <a className="link-light text-decoration-none" href="mailto:soporte@levelupgamer.com">soporte@levelupgamer.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;