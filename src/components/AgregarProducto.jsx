import { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

function AgregarProducto() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { token } = useContext(AuthContext);

  // Si no hay token, mostrar mensaje de acceso restringido
  if (!token) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center text-red-600 dark:text-red-400">
        ⚠️ Debes iniciar sesión para agregar productos.
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/productos', {
        nombre,
        precio,
        stock
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensaje(res.data.mensaje || 'Producto creado');
      setNombre('');
      setPrecio('');
      setStock('');
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMensaje(error.response?.data?.message || 'Error al crear producto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Agregar producto</h2>
      <input
        type="text"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        placeholder="Nombre"
        className="w-full mb-4 p-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
      />
      <input
        type="number"
        value={precio}
        onChange={e => setPrecio(e.target.value)}
        placeholder="Precio"
        className="w-full mb-4 p-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
      />
      <input
        type="number"
        value={stock}
        onChange={e => setStock(e.target.value)}
        placeholder="Stock"
        className="w-full mb-4 p-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
      />
      <button type="submit" className="w-full bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700">
        Guardar
      </button>
      {mensaje && (
        <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
          {mensaje}
        </p>
      )}
    </form>
  );
}

export default AgregarProducto;
