export function DashboardHeader({ onOpenMovieModal, onOpenShowtimeModal }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-(--color-card) p-6 rounded-2xl border border-gray-800 shadow-xl">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 rounded-full">
            Panel Administrativo Principal
          </span>
          <span className="text-xs text-emerald-400 font-mono">⚡ Sesión Protegida JWT</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Cineplas Operations Hub</h1>
        <p className="text-gray-400 text-sm mt-1">
          Gestión centralizada de cines, diagramación de salas, catálogo de cartelera y programación de funciones.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onOpenMovieModal}
          className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold text-sm border border-gray-700 transition-all cursor-pointer flex items-center gap-2"
        >
          <span>🎬 Añadir Película</span>
        </button>
        <button
          onClick={onOpenShowtimeModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-sm shadow-lg shadow-red-500/20 transition-all cursor-pointer flex items-center gap-2"
        >
          <span>🎟️ Crear Función</span>
        </button>
      </div>
    </div>
  );
}
