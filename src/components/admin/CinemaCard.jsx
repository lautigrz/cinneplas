function CinemaCard({ cinema, onViewing, onEdit, onDelete }) {
  const roomsCount = cinema.rooms?.length || 0;

  return (
    <div className="bg-(--color-card) border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all shadow-lg flex flex-col justify-between">
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-[10px] font-mono tracking-wider bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700">
              ID: {cinema.idPublic}
            </span>
            <h3 className="text-xl font-bold text-white mt-2 leading-tight">
              {cinema.name}
            </h3>
          </div>
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center text-xs font-bold border border-red-500/20">
            #{cinema.id}
          </span>
        </div>

        <p className="text-xs text-gray-400 flex items-start gap-1.5 mb-6 min-h-[32px]">
          <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="currentColor" className="text-red-500 shrink-0 mt-0.5">
            <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 320q133-121 196.5-219.5T740-560q0-118-75.5-199T480-840q-113 0-188.5 81T216-560q0 80 63.5 178.5T480-160Z" />
          </svg>
          {cinema.address}
        </p>

        <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800/80 mb-4">
          <div>
            <span className="text-[11px] text-gray-400 block">Salas</span>
            <span className="text-sm font-semibold text-white">
              {roomsCount} {roomsCount === 1 ? "sala" : "salas"}
            </span>
          </div>
        </div>

        {roomsCount > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {cinema.rooms.slice(0, 3).map((room) => (
              <span
                key={room.id}
                className="text-[11px] bg-gray-800/80 text-gray-300 px-2.5 py-1 rounded-lg border border-gray-700/50 flex items-center gap-1"
              >
                <span>🎬 {room.name}</span>
              </span>
            ))}
            {roomsCount > 3 && (
              <span className="text-[11px] bg-gray-800/50 text-gray-400 px-2 py-1 rounded-lg">
                +{roomsCount - 3} más
              </span>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-gray-800/80 p-4 bg-gray-900/40 flex items-center justify-between">
        <button
          onClick={() => onViewing(cinema)}
          className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Ver Salas / Detalles</span>
          <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="currentColor">
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(cinema)}
            title="Editar cine"
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="currentColor">
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(cinema.id)}
            title="Eliminar cine"
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="currentColor">
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CinemaCard;
