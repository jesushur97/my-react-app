export default function CompraView() {
  const confirmarCompra = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8000/api/confirmar-compra', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    alert(data.mensaje || data.error);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Confirmar compra</h1>
      <button className="btn" onClick={confirmarCompra}>Confirmar</button>
    </div>
  );
}
