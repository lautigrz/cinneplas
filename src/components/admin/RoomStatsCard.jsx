function RoomStatsCard({ stats, gridRows, gridCols }) {
  return (
    <div className="bg-(--color-card) border border-gray-800 p-5 rounded-2xl space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-800 pb-2">
        3. Resumen de Capacidad
      </h3>

      <div className="text-center bg-gray-900/90 border border-gray-800 p-3 rounded-xl">
        <div className="text-3xl font-black text-red-500">{stats.total}</div>
        <div className="text-xs text-gray-400 font-medium">Asientos Totales Creados</div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-gray-900/60 p-2 rounded-lg border border-gray-800 flex items-center justify-between">
          <span className="text-gray-400">Estándar:</span>
          <span className="font-bold text-blue-400">{stats.counts.STANDARD}</span>
        </div>
        <div className="bg-gray-900/60 p-2 rounded-lg border border-gray-800 flex items-center justify-between">
          <span className="text-gray-400">VIP:</span>
          <span className="font-bold text-amber-400">{stats.counts.VIP}</span>
        </div>
        <div className="bg-gray-900/60 p-2 rounded-lg border border-gray-800 flex items-center justify-between">
          <span className="text-gray-400">Accesible:</span>
          <span className="font-bold text-purple-400">{stats.counts.WHEELCHAIR}</span>
        </div>
        <div className="bg-gray-900/60 p-2 rounded-lg border border-gray-800 flex items-center justify-between">
          <span className="text-gray-400">Matriz:</span>
          <span className="font-bold text-gray-300">
            {gridRows}x{gridCols}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RoomStatsCard;
