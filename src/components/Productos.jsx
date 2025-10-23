import { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { CarritoContext } from '../context/CarritoContext';

function Productos() {
  const [productos, setProductos] = useState([]);
  const { token } = useContext(AuthContext);
  const { cargarCarrito } = useContext(CarritoContext);
  const [cantidades, setCantidades] = useState({});

  useEffect(() => {
    api.get('/productos')
      .then(res => {
        setProductos(res.data);
        const inicial = {};
        res.data.forEach(p => {
          inicial[p.id] = 1;
        });
        setCantidades(inicial);
      })
      .catch(err => console.error('Error al cargar productos', err));
  }, []);

  const agregarAlCarrito = (id) => {
    const cantidad = cantidades[id] || 1;

    if (!token) {
      alert('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
      window.location.href = '/';
      return;
    }

    api.post('/carrito', { producto_id: id, cantidad }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert(`Producto agregado (${cantidad})`);
      cargarCarrito(); // ← actualiza el estado global del carrito
    })
    .catch(err => {
      console.error('Error al añadir al carrito', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        alert('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
        window.location.href = '/';
      }
    });
  };

  const eliminarProducto = (id) => {
    if (!token) return;

    api.delete(`/productos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert('Producto eliminado');
      setProductos(productos.filter(p => p.id !== id));
    })
    .catch(err => console.error('Error al eliminar producto', err));
  };

  const cambiarCantidad = (id, delta) => {
    setCantidades(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {productos.map(p => (
        <div key={p.id} className="bg-white dark:bg-gray-800 shadow rounded p-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{p.nombre}</h2>
          <p className="text-gray-700 dark:text-gray-200">Precio: €{p.precio}</p>
          <p className="text-gray-500 dark:text-gray-400">Stock: {p.stock}</p>

          <div className="flex items-center gap-2 mt-2">
            <button onClick={() => cambiarCantidad(p.id, -1)} className="px-2 bg-gray-300 dark:bg-gray-600 rounded">–</button>
            <span className="px-2 text-gray-800 dark:text-white">{cantidades[p.id] || 1}</span>
            <button onClick={() => cambiarCantidad(p.id, 1)} className="px-2 bg-gray-300 dark:bg-gray-600 rounded">+</button>
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={() => agregarAlCarrito(p.id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-400">Agregar al carrito</button>
            <button onClick={() => eliminarProducto(p.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-400">Eliminar producto</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Productos;
