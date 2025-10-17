import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function AuthForm() {
  const [modo, setModo] = useState('login'); // 'login' o 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { setToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = modo === 'login' ? '/api/login' : '/api/register';
    const payload = modo === 'login'
      ? { email, password }
      : { name, email, password };

    try {
      const res = await axios.post(`http://localhost:8000${endpoint}`, payload);
      const token = res.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      setMensaje(modo === 'login' ? 'Sesión iniciada' : 'Registro exitoso');
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMensaje('Error: ' + (error.response?.data?.error || 'No se pudo completar la acción'));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        {modo === 'login' ? 'Iniciar sesión' : 'Registrarse'}
      </h2>
      <form onSubmit={handleSubmit}>
        {modo === 'register' && (
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nombre"
            className="w-full mb-4 p-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          />
        )}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Correo"
          className="w-full mb-4 p-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full mb-4 p-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700">
          {modo === 'login' ? 'Entrar' : 'Crear cuenta'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        {modo === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
        <button
          onClick={() => setModo(modo === 'login' ? 'register' : 'login')}
          className="text-blue-500 hover:underline"
        >
          {modo === 'login' ? 'Regístrate' : 'Inicia sesión'}
        </button>
      </p>
      {mensaje && <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">{mensaje}</p>}
    </div>
  );
}

export default AuthForm;
