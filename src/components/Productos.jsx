import { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { CarritoContext } from '../context/CarritoContext';

function Productos() {
  const [productos, setProductos] = useState([]);
  const { token } = useContext(AuthContext);
  const { cargarCarrito } = useContext(CarritoContext);

  useEffect(() => {
    api.get('/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al cargar productos', err));
  }, []);

  const agregarAlCarrito = (id) => {
    api.post('/carrito', { producto_id: id, cantidad: 1 }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert('Producto agregado');
      cargarCarrito(); // Actualiza el carrito global
    })
    .catch(err => console.error(err));
  };

  // (Opcional) Eliminar producto del sistema
  const eliminarProducto = (id) => {
    api.delete(`/productos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert('Producto eliminado');
      setProductos(productos.filter(p => p.id !== id));
    })
    .catch(err => console.error('Error al eliminar producto', err));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {productos.map(p => (
        <div key={p.id} className="bg-white dark:bg-gray-800 shadow rounded p-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{p.nombre}</h2>
          <p className="text-gray-700 dark:text-gray-200">Precio: €{p.precio}</p>
          <p className="text-gray-500 dark:text-gray-400">Stock: {p.stock}</p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => agregarAlCarrito(p.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-400"
            >
              Agregar al carrito
            </button>
            {/* Botón opcional para eliminar producto */}
            <button
              onClick={() => eliminarProducto(p.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-400"
            >
              Eliminar producto
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Productos;
