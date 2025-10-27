# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and //////[`typescript-eslint`](https://typescript-eslint.io) in your project.








# TIENDA WEB - REACT + VITE + LARAVEL 

Aplicación desarrollada como parte de prácticas DAW, con frontend en React + Vite y backend en Laravel. Incluye autenticación JWT,protección de rutas,modo oscuro,gestión de productos,carrito de compras y confirmación de pedidos.

# TECNOLOGÍAS UTILIZADAS

· Frontend: React,Vite,TailwindCSS
· Routing SPA: React Router DOM
· Estado y autenticación: Context API + localstorage
· Backend: Laravel 12 + JWT
· Estilos: TailwindCSS + modo oscuro dinámico
· Validación técnica: cobertura de rutas, renderizado condicional,simulación de escenarios reales


# ESTRUCTURA DEL PROYECTO

my-react-app/
├── components/
│   ├── AuthForm.jsx
│   ├── LogoutButton.jsx
│   ├── RutaPrivada.jsx
│   ├── ModoOscuroToggle.jsx
│   └── AgregarProducto.jsx
├── viewsglobal/
│   ├── Productos.jsx
│   ├── Carrito.jsx
│   ├── ConfirmarCompra.jsx
│   └── Historial.jsx
├── App.jsx
├── index.css
└── main.jsx


# AUTENTICACIÓN Y PROTECCIÓN

· Inicio de sesión mediante AuthForm.jsx -> POST /api/login
· Token JWT almacenado en localstorage
· Renderizado condicional de vistas y navegación
· Cierre de sesión con LogoutButton.jsx


# ENDPOINTS API LARAVEL

· GET /api/productos -> Listado de productos
· POST /api/login -> Autenticación
· GET /api/carrito -> Productos en el carrito
· POST /api/confirmar-compra -> Confirmar pedido
· GET /api/historial -> Historial del usuario

# INSTALACIÓN Y EJECUCIÓN

· BACKEND LARAVEL:

- cd backend-laravel (Situarse en htdocs en caso de usar xampp -Servicio local-)
- composer install
- php artisan migrate --seed
- php artisan serve

· FRONTEND REACT:

- cd my-react-app (Cualquier ruta)
- npm install
- npm run dev

Accedo a la app en http://localhost:5173








# REPOSITORIO

· Puedes ver el código fuente en https://github.com/jesushur97?tab=repositories


# AUTOR

Jesús Hurtado Cebrián
Estudiante DAW/DAM/ASIR | Córdoba,España
Contacto: jesushur097@gmail.com


# LICENCIA

Este proyecto está bajo licencia MIT. Puedes adaptarlo libremente para uso educativo.