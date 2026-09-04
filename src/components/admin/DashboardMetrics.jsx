export function DashboardMetrics({ cinemasCount, totalRooms, totalCapacity, showtimesCount }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
      <div className="bg-(--color-card) p-5 rounded-2xl border border-gray-800 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20 text-xl">
          🏢
        </div>
        <div>
          <p className="text-xs uppercase font-medium text-gray-400">Sedes de Cine</p>
          <h3 className="text-2xl font-bold text-white">{cinemasCount}</h3>
        </div>
      </div>

      <div className="bg-(--color-card) p-5 rounded-2xl border border-gray-800 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 text-xl">
          📐
        </div>
        <div>
          <p className="text-xs uppercase font-medium text-gray-400">Salas Activas</p>
          <h3 className="text-2xl font-bold text-white">{totalRooms}</h3>
        </div>
      </div>

      <div className="bg-(--color-card) p-5 rounded-2xl border border-gray-800 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 text-xl">
          💺
        </div>
        <div>
          <p className="text-xs uppercase font-medium text-gray-400">Butacas Totales</p>
          <h3 className="text-2xl font-bold text-white">{totalCapacity}</h3>
        </div>
      </div>

      <div className="bg-(--color-card) p-5 rounded-2xl border border-gray-800 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 text-xl">
          🎥
        </div>
        <div>
          <p className="text-xs uppercase font-medium text-gray-400">Funciones Programadas</p>
          <h3 className="text-2xl font-bold text-white">{showtimesCount}</h3>
        </div>
      </div>
    </div>
  );
}
