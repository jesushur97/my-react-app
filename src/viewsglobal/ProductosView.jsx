import { useState, useEffect } from 'react';

export default function ProductosView() {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', precio: '', stock: '' });

  useEffect(() => {
    fetch('http://localhost:8000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  const agregarProducto = async () => {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:8000/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(nuevo)
    });
    window.location.reload();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Productos disponibles</h1>
      <ul className="space-y-2">
        {productos.map(p => (
          <li key={p.id} className="border p-2 rounded">
            {p.nombre} - {p.precio}€ ({p.stock} en stock)
          </li>
        ))}
      </ul>

      <div className="mt-6 space-y-2">
        <input type="text" placeholder="Nombre" className="input" onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })} />
        <input type="number" placeholder="Precio" className="input" onChange={e => setNuevo({ ...nuevo, precio: e.target.value })} />
        <input type="number" placeholder="Stock" className="input" onChange={e => setNuevo({ ...nuevo, stock: e.target.value })} />
        <button className="btn" onClick={agregarProducto}>Guardar</button>
      </div>
    </div>
  );
}
