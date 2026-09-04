function SeatLegendAdmin() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 bg-gray-900/50 p-4 rounded-2xl border border-gray-800">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded bg-blue-600 border border-blue-400" />
        <span>Asiento Estándar</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded bg-amber-500 border border-amber-300" />
        <span>Asiento VIP</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded bg-purple-600 border border-purple-400" />
        <span>Accesible</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded bg-red-600 border border-red-400" />
        <span>Premium</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded bg-gray-900 border border-gray-800" />
        <span>Pasillo / Espacio Vacío</span>
      </div>
    </div>
  );
}

export default SeatLegendAdmin;
