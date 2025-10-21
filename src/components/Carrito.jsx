import { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

function Carrito() {
  const [items, setItems] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    api.get('/carrito', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setItems(res.data))
    .catch(err => console.error(err));
  }, []);

  const eliminarItem = (id) => {
    api.delete(`/carrito/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setItems(items.filter(item => item.id !== id));
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Tu carrito</h2>
      {items.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No hay productos en el carrito.</p>
      ) : (
        <div className="grid gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 shadow rounded p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100">{item.producto.nombre}</h3>
                <p className="text-gray-600 dark:text-gray-300">Cantidad: {item.cantidad}</p>
              </div>
              <button
                onClick={() => eliminarItem(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Carrito;
