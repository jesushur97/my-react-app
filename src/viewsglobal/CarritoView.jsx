import { useState, useEffect } from 'react';

export default function CarritoView() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/api/carrito', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCarrito(data));
  }, []);

  const eliminarItem = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:8000/api/carrito/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setCarrito(carrito.filter(item => item.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Carrito</h1>
      {carrito.length === 0 ? <p>Tu carrito está vacío.</p> : (
        <ul className="space-y-2">
          {carrito.map(item => (
            <li key={item.id} className="border p-2 rounded flex justify-between">
              {item.producto.nombre} x {item.cantidad}
              <button className="btn-red" onClick={() => eliminarItem(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
