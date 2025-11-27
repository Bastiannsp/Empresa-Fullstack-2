import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function NavBar() { 
  const { totalUnidades } = useCart();
  const { isAuthenticated, user, logout, permissions } = useAuth();

  const isAdmin = permissions.canAccessAdmin;

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <span>LEVEL-UP GAMER</span>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarFS2">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarFS2">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nosotros">Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">Contacto</Link>
              </li>
              {!isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/registro">Registro</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </>
              )}
              {isAuthenticated && (
                <li className="nav-item dropdown">
                  <button className="nav-link dropdown-toggle btn btn-link text-decoration-none" id="userMenu" type="button" data-bs-toggle="dropdown">
                    {user?.username || 'Cuenta'}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                    {isAdmin && (
                      <li><Link className="dropdown-item" to="/admin">Panel Admin</Link></li>
                    )}
                    <li><button className="dropdown-item" type="button" onClick={logout}>Cerrar sesión</button></li>
                  </ul>
                </li>
              )}
              
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-1" to="/carrito">
                  🛒 
                  <span id="cartCount" className="badge text-bg-light">
                    {totalUnidades}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar; // O "Navbar"