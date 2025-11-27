import React, { useCallback, useEffect, useState } from 'react';
// 1. Importamos el Servicio
import ProductService from '../services/ProductService';
import { useAuth } from '../context/AuthContext';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState(0);
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [editingId, setEditingId] = useState(null);
  const { permissions } = useAuth();
  const canManageCatalog = permissions.canManageCatalog;

  // Cargar productos al inicio
  const loadProducts = useCallback(() => {
    ProductService.getAllProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (canManageCatalog) {
      loadProducts();
    }
  }, [canManageCatalog, loadProducts]);

  const resetForm = () => {
    setNombre(''); setCategoria(''); setPrecio(0); setImagen(''); setDescripcion(''); setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const productData = { nombre, categoria, precio: parseInt(precio), imagen, descripcion };

    if (editingId) {
      // UPDATE (Backend)
      ProductService.updateProduct(editingId, productData)
        .then(() => {
          loadProducts();
          resetForm();
        });
    } else {
      // CREATE (Backend)
      // Enviamos el producto a Java
      ProductService.createProduct(productData)
        .then(() => {
          loadProducts();
          resetForm();
        });
    }
  };

  const handleDelete = (productId) => {
    if (window.confirm("¿Borrar producto de la base de datos?")) {
      // DELETE (Backend)
      ProductService.deleteProduct(productId)
        .then(() => loadProducts());
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setNombre(product.nombre);
    setCategoria(product.categoria);
    setPrecio(product.precio);
    setImagen(product.imagen);
    setDescripcion(product.descripcion);
    window.scrollTo(0, 0);
  };

  if (!canManageCatalog) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          No tenés permisos para administrar el catálogo.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* El formulario es visualmente igual, pero ahora guarda en Java */}
      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h3 className="h5 mb-0">{editingId ? 'Editar' : 'Agregar'} Producto</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Categoría</label>
                <input type="text" className="form-control" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Precio</label>
                <input type="number" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Imagen (ej: /img/logo.png)</label>
                <input type="text" className="form-control" value={imagen} onChange={(e) => setImagen(e.target.value)} required />
              </div>
              <div className="col-12">
                <label className="form-label">Descripción</label>
                <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">Guardar en Base de Datos</button>
                {editingId && <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>Cancelar</button>}
              </div>
            </div>
          </form>
        </div>
      </div>

      <h3 className="h5 mt-5 mb-3">Inventario (Base de Datos H2)</h3>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td><img src={p.imagen} alt={p.nombre} style={{width:'50px'}} /></td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>${p.precio}</td>
                <td>
                  <button onClick={() => handleEdit(p)} className="btn btn-sm btn-info me-2">Editar</button>
                  <button onClick={() => handleDelete(p.id)} className="btn btn-sm btn-danger">Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;