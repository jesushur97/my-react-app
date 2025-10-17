import { useEffect, useState } from 'react';

function ModoOscuroToggle() {
  const [modoOscuro, setModoOscuro] = useState(false);

  useEffect(() => {
    if (modoOscuro) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [modoOscuro]);

  return (
    <button
      onClick={() => setModoOscuro(!modoOscuro)}
      className="px-4 py-2 rounded bg-gray-800 text-white dark:bg-yellow-300 dark:text-black"
    >
      {modoOscuro ? '☀️ Modo claro' : '🌙 Modo oscuro'}
    </button>
  );
}

export default ModoOscuroToggle;
