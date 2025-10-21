import { useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

function LogoutButton() {
  const { setToken } = useContext(AuthContext);

  const cerrarSesion = () => {
    api.post('/logout', {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(() => {
      localStorage.removeItem('token');
      setToken(null);
      alert('Sesión cerrada');
    })
    .catch(err => console.error('Error al cerrar sesión', err));
  };

  return (
    <button
      onClick={cerrarSesion}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-400"
    >
      Cerrar sesión
    </button>
  );
}

export default LogoutButton;
