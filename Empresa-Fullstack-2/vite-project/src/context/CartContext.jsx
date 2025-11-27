import React, { createContext, useState, useEffect, useContext } from 'react';
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]); 
  const parsePrecio = (v) => parseInt(String(v).replace(/\D/g, "")) || 0;
  const agregarProducto = (id, nombre, precio, imagen) => {
    precio = parsePrecio(precio);
    
    setCarrito(prevCarrito => {
      const idx = prevCarrito.findIndex((it) => it.id === id);
      if (idx >= 0) {
        const nuevoCarrito = [...prevCarrito];
        nuevoCarrito[idx] = { 
          ...nuevoCarrito[idx], 
          cantidad: nuevoCarrito[idx].cantidad + 1,
          precio, 
          imagen  
        };
        return nuevoCarrito;
      } else {
        return [...prevCarrito, { id, nombre, precio, imagen, cantidad: 1 }];
      }
    });
  };

  const eliminarProducto = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter((it) => it.id !== id));
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito(prevCarrito => {
      const nuevoCarrito = prevCarrito.map(item => {
        if (item.id === id) {
          return { ...item, cantidad: item.cantidad + delta };
        }
        return item;
      });
      return nuevoCarrito.filter(item => item.cantidad > 0);
    });
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };
  const totalUnidades = carrito.reduce((acc, it) => acc + it.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, it) => acc + (it.precio * it.cantidad), 0);
  const value = {
    carrito,
    agregarProducto,
    eliminarProducto,
    cambiarCantidad,
    vaciarCarrito,
    totalUnidades,
    totalPrecio
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}