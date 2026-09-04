import { Link } from "react-router";

function CinemaHeader({ onOpenCreateModal }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-(--color-card) p-6 rounded-2xl border border-gray-800 shadow-xl">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 rounded-full">
            Módulo Admin
          </span>
          <span className="text-xs text-gray-400">Prisma Schema: Cinema & CinemaRoom</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Gestión de Cines</h1>
        <p className="text-gray-400 text-sm mt-1">
          Administra las sedes disponibles, registra nuevos cines y configura sus salas con capacidad.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/admin/create-room"
          className="px-4 py-2.5 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white transition-all text-sm font-semibold flex items-center gap-2 border border-gray-700 shadow-sm"
        >
          <span>📐 Creador de Asientos</span>
        </Link>
        <button
          onClick={onOpenCreateModal}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-sm shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all cursor-pointer flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor">
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
          <span>Nuevo Cine</span>
        </button>
      </div>
    </div>
  );
}

export default CinemaHeader;
