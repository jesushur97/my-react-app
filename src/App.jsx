import { useState, useEffect } from 'react';
import './index.css';
import Productos from './components/Productos';
import Carrito from './components/Carrito';
import ConfirmarCompra from './components/ConfirmarCompra';
import Historial from './components/Historial';
import AgregarProducto from './components/AgregarProducto';
import ModoOscuroToggle from './components/ModoOscuroToggle';
import reactLogo from './assets/react.svg';
import AuthForm from './components/AuthForm';


 

function App() {
  const [count, setCount] = useState(0);
  const [seccion, setSeccion] = useState('productos');
  const [modoOscuro, setModoOscuro] = useState(false);

  // Aplica o quita la clase 'dark' en <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', modoOscuro);
  }, [modoOscuro]);




  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      {/* Cabecera con logos y contador */}
      <header className="flex flex-col items-center justify-center py-6">
        <div className="flex gap-4 mb-4">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src="/vite.svg" className="w-16 hover:scale-110 transition" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="w-16 hover:scale-110 transition" alt="React logo" />
          </a>
        </div>
        <h1 className="text-8xl font-bold text-blue-600 dark:text-yellow-400">Vite + React + Tailwind</h1>
        {/*<div className="bg-white dark:bg-gray-800 shadow-md rounded p-4 mt-4 text-center">
          <button
            //onClick={() => setCount(count + 1)}
            //className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            // count is {count}
          </button>
        </div>*/}
      </header>





      {/* Botón de modo oscuro */}
      <div className="flex justify-end px-4">
       
        <ModoOscuroToggle modoOscuro={modoOscuro} setModoOscuro={setModoOscuro} />
      </div>





      {/* Navegación */}
      <nav className="flex justify-center gap-4 mb-6 flex-wrap">
        <button onClick={() => setSeccion('productos')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Productos
        </button>
        <button onClick={() => setSeccion('carrito')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Carrito
        </button>
        <button onClick={() => setSeccion('confirmar')} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Confirmar
        </button>
        <button onClick={() => setSeccion('historial')} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Historial
        </button>
      </nav>

{/* LOGIN O REGISTRO */}
<div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AuthForm />
    </div>



      {/* Secciones dinámicas */}
      <main className="p-4">
        {seccion === 'productos' && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">Productos disponibles</h2>
            <Productos />
          </>
        )}
        {seccion === 'carrito' && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">Tu carrito</h2>
            <Carrito />
          </>
        )}
        {seccion === 'confirmar' && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">Confirmar compra</h2>
            <ConfirmarCompra />
          </>
        )}
        {seccion === 'historial' && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">Historial de compras</h2>
            <Historial />
          </>
        )}
      </main>

      {/* Formulario de agregar producto */}
      <main className="p-4">
        <AgregarProducto />
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-6">
        Jesús Hurtado Cebrián. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App;
