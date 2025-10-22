import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

function LogoutButton() {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    if (!token || token.length < 10) {
      alert('Token inválido o sesión expirada');
      return;
    }

    api.post('/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      localStorage.removeItem('token');
      setToken(null);
      alert('Sesión cerrada correctamente');
      navigate('/');
    })
    .catch(err => {
      console.error('Error al cerrar sesión', err);
      // Aun así limpiamos el token
  localStorage.removeItem('token');
  setToken(null);
  alert('Sesión cerrada localmente');
  navigate('/');
});
  };

  if (!token) return null;

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
