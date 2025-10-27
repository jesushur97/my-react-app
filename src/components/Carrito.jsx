import { useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { CarritoContext } from '../context/CarritoContext';

function Carrito() {
  const { items, cargarCarrito } = useContext(CarritoContext);
  const { token } = useContext(AuthContext);

  const eliminarItem = (id) => {
    if (!token) return;

    api.delete(`/carrito/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      cargarCarrito();
    })
    .catch(err => console.error('Error al eliminar del carrito', err));
  };

  const total = items.reduce((acc, item) => {
  const precio = Number(item.producto?.precio);
  return acc + (!isNaN(precio) ? precio * item.cantidad : 0);
}, 0);


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">Tu carrito</h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">El carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
         {items.map(item => {
  const producto = item.producto;
  const precio = Number(producto?.precio);

  if (!producto || isNaN(precio)) {
    return (
      <div key={item.id} className="flex justify-between items-center bg-red-100 dark:bg-red-800 p-4 rounded">
        <p className="text-sm text-red-600 dark:text-red-300 font-semibold">
          Este producto ya no está disponible o tiene datos incompletos.
        </p>
        <button
          onClick={() => eliminarItem(item.id)}
          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 dark:hover:bg-red-400"
        >
          Eliminar
        </button>
      </div>
    );
  }

  return (
    <div key={item.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{producto.nombre}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">Precio unitario: €{precio.toFixed(2)}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">Cantidad: {item.cantidad}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 font-bold">Subtotal: €{(precio * item.cantidad).toFixed(2)}</p>
      </div>
      <button
        onClick={() => eliminarItem(item.id)}
        className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 dark:hover:bg-red-400"
      >
        Eliminar
      </button>
    </div>
  );
})}


          <div className="text-right mt-6">
            <p className="text-xl font-bold text-gray-800 dark:text-white">Total: €{total.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;
