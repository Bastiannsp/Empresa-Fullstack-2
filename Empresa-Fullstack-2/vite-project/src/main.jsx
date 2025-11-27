import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// -- IMPORTS COMPONENTES
import App from './App.jsx';
import Home from './components/Home.jsx';
import ProductList from './components/ProductList.jsx';
import ProductDetail from './components/ProductDetail.jsx'; 
import Nosotros from './components/Nosotros.jsx';
import Contacto from './components/Contacto.jsx';
import AdminProducts from './components/AdminProducts.jsx';
import Registro from './components/Registro.jsx';
import Login from './components/Login.jsx';
import Carrito from './components/Carrito.jsx';
import Checkout from './components/Checkout.jsx';         
import Confirmacion from './components/Confirmacion.jsx'; 
import ProtectedRoute from './components/ProtectedRoute.jsx';

import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './estilo.css'; 
import './index.css';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { path: "/", element: <Home /> },
      { path: "/productos", element: <ProductList /> },
      { path: "/productos/:id", element: <ProductDetail /> }, 
      { path: "/nosotros", element: <Nosotros /> },
      { path: "/contacto", element: <Contacto /> },

      { path: "/registro", element: <Registro /> },
      { path: "/login", element: <Login /> },
      { path: "/carrito", element: <Carrito /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/confirmacion", element: <Confirmacion /> },
      {
        path: "/admin",
        element: <ProtectedRoute roles={['ROLE_ADMIN']} />,
        children: [
          { index: true, element: <AdminProducts /> }
        ]
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);