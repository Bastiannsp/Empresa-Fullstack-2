import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
// 1. Importamos el Servicio en lugar de database.js
import ProductService from '../services/ProductService'; 
import ProductCard from './ProductCard';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  
  // Filtros
  const [buscarNombre, setBuscarNombre] = useState('');
  const [buscarCategoria, setBuscarCategoria] = useState('');
  const { permissions, loading } = useAuth();
  const canViewCatalog = permissions.canViewCatalog;

  // 2. Usamos useEffect para pedir los datos al Backend
  useEffect(() => {
    if (!canViewCatalog) {
      return;
    }
    ProductService.getAllProducts()
      .then(response => {
        setProducts(response.data);
        setError(null);
      })
      .catch(err => {
        console.error('Error al cargar productos:', err);
        setError('No pudimos cargar el catálogo. Intenta más tarde.');
      });
  }, [canViewCatalog]);

  // Lógica de filtrado (Igual que antes)
  const productosFiltrados = products.filter(product => {
    const coincideNombre = product.nombre.toLowerCase().includes(buscarNombre.toLowerCase());
    const coincideCategoria = buscarCategoria === '' || product.categoria === buscarCategoria;
    return coincideNombre && coincideCategoria;
  });

  const categorias = [...new Set(products.map(p => p.categoria))];

  return (
    <div className="container py-4">
      <h2 className="h4 mb-3">Productos (Desde Spring Boot)</h2>

      {!loading && !canViewCatalog && (
        <div className="alert alert-info" role="alert">
          Inicia sesión para ver el catálogo y gestionar tus compras.
        </div>
      )}

      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <p>Cargando...</p>
      )}
      
      {canViewCatalog && !loading && (
        <>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre"
                value={buscarNombre}
                onChange={(e) => setBuscarNombre(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <select 
                className="form-select"
                value={buscarCategoria}
                onChange={(e) => setBuscarCategoria(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {productosFiltrados.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductList;