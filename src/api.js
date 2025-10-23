import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 5000, // Opcional: evita que se quede colgado
});

// Añade el token automáticamente si existe
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// (Opcional) Interceptor de respuesta para manejar errores globales
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn('Token inválido o expirado');
      // Aquí podrías limpiar el token y redirigir si lo deseas
    }
    return Promise.reject(error);
  }
);

export default api;
