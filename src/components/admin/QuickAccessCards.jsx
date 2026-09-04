import { Link } from "react-router";

export function QuickAccessCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Link
        to="/admin/cinemas"
        className="group bg-(--color-card) border border-gray-800 hover:border-red-500/50 p-6 rounded-2xl transition-all shadow-xl flex items-center justify-between"
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
            Módulo Principal
          </span>
          <h3 className="text-xl font-bold text-white mt-3 group-hover:text-red-400 transition-colors">
            🏢 Gestión de Cines y Salas
          </h3>
          <p className="text-xs text-gray-400 mt-1 max-w-md">
            Crea sedes de cine, administra direcciones y agrega o elimina salas asociadas.
          </p>
        </div>
        <span className="text-2xl text-gray-400 group-hover:text-red-400 transition-transform group-hover:translate-x-1">
          ➔
        </span>
      </Link>

      <Link
        to="/admin/create-room"
        className="group bg-(--color-card) border border-gray-800 hover:border-amber-500/50 p-6 rounded-2xl transition-all shadow-xl flex items-center justify-between"
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            Diseñador Interactivo
          </span>
          <h3 className="text-xl font-bold text-white mt-3 group-hover:text-amber-400 transition-colors">
            📐 Creador de Asientos y Grid
          </h3>
          <p className="text-xs text-gray-400 mt-1 max-w-md">
            Configura el mapa de asientos por filas y columnas, asigna vip/discapacitados o pasillos.
          </p>
        </div>
        <span className="text-2xl text-gray-400 group-hover:text-amber-400 transition-transform group-hover:translate-x-1">
          ➔
        </span>
      </Link>
    </div>
  );
}
