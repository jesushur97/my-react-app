import { useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { CarritoContext } from '../context/CarritoContext';

function ConfirmarCompra() {
  const { token } = useContext(AuthContext);
  const { setItems } = useContext(CarritoContext);

  const confirmar = () => {
    api.post('/confirmar-compra', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setItems([]); // Vacía el carrito
      alert('Compra confirmada con éxito');
    })
    .catch(err => {
      console.error(err);
      alert('Error al confirmar la compra');
    });
  };

  return (
    <div className="text-center mt-8">
      <button onClick={confirmar} className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">
        Confirmar compra
      </button>
    </div>
  );
}

export default ConfirmarCompra;
