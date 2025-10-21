import { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

function Historial() {
  const [compras, setCompras] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    api.get('/mis-compras', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setCompras(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Historial de compras</h2>
      {compras.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Aún no has realizado ninguna compra.</p>
      ) : (
        <div className="space-y-6">
          {compras.map(order => (
            <div key={order.id} className="bg-white dark:bg-gray-800 shadow rounded p-4">
              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">Pedido #{order.id}</h3>
              <p className="text-gray-600 dark:text-gray-300">Total: €{order.total}</p>
              <p className="text-gray-500 dark:text-gray-400">Fecha: {new Date(order.created_at).toLocaleDateString()}</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 dark:text-gray-200">
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.producto.nombre} — {item.cantidad} × €{item.precio_unitario}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Historial;
