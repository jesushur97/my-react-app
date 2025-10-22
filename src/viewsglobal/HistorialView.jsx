import { useState, useEffect } from 'react';

export default function HistorialView() {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/api/mis-compras', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setHistorial(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Historial de compras</h1>
      {historial.length === 0 ? <p>No hay compras registradas.</p> : (
        <ul className="space-y-4">
          {historial.map(order => (
            <li key={order.id} className="border p-4 rounded">
              <p className="font-semibold">Pedido #{order.id} - Total: {order.total}€</p>
              <ul className="mt-2 space-y-1">
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.producto.nombre} x {item.cantidad} → {item.precio_unitario}€
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
