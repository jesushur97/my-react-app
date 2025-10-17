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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {productos.map(p => (
        <div key={p.id} className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold">{p.nombre}</h2>
          <p className="text-gray-700">Precio: €{p.precio}</p>
          <p className="text-gray-500">Stock: {p.stock}</p>
          <button onClick={() => agregarAlCarrito(p.id)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}

export default Productos;
