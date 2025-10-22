import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './index.css';
import Productos from './components/Productos';
import Carrito from './components/Carrito';
import ConfirmarCompra from './components/ConfirmarCompra';
import Historial from './components/Historial';
import AgregarProducto from './components/AgregarProducto';
import ModoOscuroToggle from './components/ModoOscuroToggle';
import reactLogo from './assets/react.svg';
import AuthForm from './components/AuthForm';
import LogoutButton from './components/LogoutButton';
import { useState, useEffect } from 'react';
import Inicio from './components/Inicio';
import InicioView from './viewsglobal/InicioView';


function AppContent() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', modoOscuro);
  }, [modoOscuro]);

  const isProductos = location.pathname === '/productos';
  const isLoginVisible = location.pathname === '/productos' && !token;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      
      {/* Cabecera */}
      <header className="flex flex-col items-center justify-center py-6">
        <div className="flex gap-4 mb-4">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src="/vite.svg" className="w-16 hover:scale-110 transition" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="w-16 hover:scale-110 transition" alt="React logo" />
          </a>
        </div>
        <h1 className="text-8xl font-bold text-blue-600 dark:text-yellow-400">
          Vite + React + Tailwind
        </h1>
      </header>

      {/* Botón de modo oscuro */}
      <div className="flex justify-end px-4">
        <ModoOscuroToggle modoOscuro={modoOscuro} setModoOscuro={setModoOscuro} />
      </div>

      {/* Navegación */}
      <nav className="flex justify-center gap-4 mb-6 flex-wrap">
        <Link to="/" className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">Inicio</Link>

        <Link to="/productos" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Productos</Link>
        <Link to="/carrito" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Carrito</Link>
        <Link to="/confirmar" className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Confirmar</Link>
        <Link to="/historial" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Historial</Link>
        <LogoutButton />
      </nav>

    

      {/* Rutas */}
      <main className="p-4">
        <Routes>
          <Route path="/" element={<InicioView />} />

          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<><h2 className="text-2xl font-semibold mb-4 text-center">Productos disponibles</h2><Productos /></>} />
          <Route path="/carrito" element={<><h2 className="text-2xl font-semibold mb-4 text-center">Tu carrito</h2><Carrito /></>} />
          <Route path="/confirmar" element={<><h2 className="text-2xl font-semibold mb-4 text-center">Confirmar compra</h2><ConfirmarCompra /></>} />
          <Route path="/historial" element={<><h2 className="text-2xl font-semibold mb-4 text-center">Historial de compras</h2><Historial /></>} />
          

        </Routes>
      </main>

      {/* Agregar producto solo en /productos */}
      {isProductos && (
        <main className="p-4">
          <AgregarProducto />
        </main>
      )}

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-6">
        Jesús Hurtado Cebrián. Todos los derechos reservados.
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
