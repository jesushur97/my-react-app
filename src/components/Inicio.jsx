import AuthForm from './AuthForm';

export default function Inicio() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
      <h2 className="text-4xl font-bold mb-6 text-blue-600 dark:text-yellow-400">Bienvenido a la tienda</h2>
      <p className="text-lg mb-4 text-center">Inicia sesión para acceder a tu carrito, historial y confirmar compras.</p>
      <AuthForm />
    </div>
  );
}
