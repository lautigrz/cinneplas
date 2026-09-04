import { Link } from "react-router";

function RoomHeader({ onSaveRoom, cinemaName, isSaving }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-800">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-red-500 uppercase tracking-widest">
          <span>Panel Administrativo</span>
          <span>•</span>
          <span>Diseñador de Salas</span>
          {cinemaName && (
            <>
              <span>•</span>
              <span className="text-gray-400 normal-case font-normal tracking-normal">{cinemaName}</span>
            </>
          )}
        </div>
        <h1 className="text-3xl font-black mt-1">Crear Nueva Sala de Cine</h1>
        <p className="text-sm text-gray-400 mt-1">
          Dibuja los asientos disponibles en la cuadrícula ajustando su posición X e Y.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/admin/cinemas"
          className="px-4 py-2 bg-gray-900 border border-gray-800 hover:bg-gray-800 text-gray-300 rounded-xl text-sm font-medium transition cursor-pointer"
        >
          Cancelar
        </Link>
        <button
          onClick={onSaveRoom}
          disabled={isSaving}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold shadow-lg shadow-red-900/30 transition cursor-pointer flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
            <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
          </svg>
          <span>{isSaving ? "Guardando..." : "Guardar Sala"}</span>
        </button>
      </div>
    </div>
  );
}

export default RoomHeader;

