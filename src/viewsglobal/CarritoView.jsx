import { useState, useEffect } from 'react';

export default function CarritoView() {
  const [carrito, setCarrito] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No estás autenticado. Inicia sesión.');
      return;
    }

    fetch('http://localhost:8000/api/carrito', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar el carrito');
        return res.json();
      })
      .then(data => setCarrito(data))
      .catch(err => {
        console.error(err);
        setError('Tu sesión ha expirado o hubo un error al cargar el carrito.');
      });
  }, []);

  const eliminarItem = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:8000/api/carrito/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Error al eliminar el producto');

      setCarrito(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error(err);
      alert('No se pudo eliminar el producto. Intenta de nuevo.');
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((acc, item) => {
      const precio = item.producto?.precio;
      return acc + (typeof precio === 'number' ? precio * item.cantidad : 0);
    }, 0);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Tu carrito</h1>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : carrito.length === 0 ? (
        <p className="text-center text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <ul className="space-y-4">
          {carrito.map(item => (
            <li key={item.id} className="border p-4 rounded flex justify-between items-center bg-gray-100 dark:bg-gray-700">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {item.producto?.nombre || 'Producto no disponible'}
                </h3>
                {typeof item.producto?.precio === 'number' ? (
                  <>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Precio unitario: €{item.producto.precio.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Cantidad: {item.cantidad}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-bold">
                      Subtotal: €{(item.producto.precio * item.cantidad).toFixed(2)}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-red-500">Este producto ya no está disponible.</p>
                )}
              </div>
              <button
                onClick={() => eliminarItem(item.id)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 dark:hover:bg-red-400"
              >
                Eliminar
              </button>
            </li>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              Total: €{calcularTotal().toFixed(2)}
            </p>
          </div>
        </ul>
      )}
    </div>
  );
}
