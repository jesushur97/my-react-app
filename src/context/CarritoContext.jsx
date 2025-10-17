import { createContext, useState, useEffect } from 'react';
import api from '../api';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([]);

  const cargarCarrito = async () => {
    try {
      const res = await api.get('/carrito');
      setItems(res.data);
    } catch (err) {
      console.error('Error al cargar carrito', err);
    }
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  return (
    <CarritoContext.Provider value={{ items, setItems, cargarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}
