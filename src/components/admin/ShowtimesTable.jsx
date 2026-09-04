export function ShowtimesTable({ showtimes, onDeleteShowtime, onOpenShowtimeModal }) {
  return (
    <div className="bg-(--color-card) border border-gray-800 rounded-2xl p-6 mb-8 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">📅 Funciones Programadas en Horario</h3>
          <p className="text-xs text-gray-400">Horarios asignados a cines y salas específicas</p>
        </div>
        <button
          onClick={onOpenShowtimeModal}
          className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
        >
          + Nueva Función
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-900/80 text-gray-400 uppercase font-semibold border-b border-gray-800">
            <tr>
              <th className="p-3">Película</th>
              <th className="p-3">Cine / Sede</th>
              <th className="p-3">Sala</th>
              <th className="p-3">Fecha y Hora</th>
              <th className="p-3">Precio Entrada</th>
              <th className="p-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {showtimes.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No hay funciones programadas. Haz clic en <strong>+ Nueva Función</strong> para agregar una.
                </td>
              </tr>
            ) : (
              showtimes.map((st) => (
                <tr key={st.id} className="hover:bg-gray-900/40">
                  <td className="p-3 font-bold text-white">{st.movieTitle}</td>
                  <td className="p-3 text-gray-300">{st.cinemaName}</td>
                  <td className="p-3 text-gray-300">
                    <span className="bg-gray-800 px-2 py-0.5 rounded text-[11px] font-mono border border-gray-700">
                      {st.roomName}
                    </span>
                  </td>
                  <td className="p-3 text-gray-300">{st.date} - <strong className="text-white">{st.time} hs</strong></td>
                  <td className="p-3 text-emerald-400 font-bold">${st.price}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onDeleteShowtime(st.id)}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      title="Eliminar función"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
