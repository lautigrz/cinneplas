import { SEAT_TYPES } from "../../constants/seatTypes";

function SeatToolSelector({ selectedTool, setSelectedTool }) {
  return (
    <div className="bg-(--color-card) border border-gray-800 p-5 rounded-2xl lg:col-span-2 space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-800 pb-2">
        2. Herramientas de Pincel (Haz clic o arrastra sobre la matriz)
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {Object.values(SEAT_TYPES).map((st) => {
          const isSelected = selectedTool === st.id;
          return (
            <button
              key={st.id}
              type="button"
              onClick={() => setSelectedTool(st.id)}
              className={`p-3 rounded-xl border flex items-center gap-3 text-left transition cursor-pointer ${
                isSelected
                  ? "border-red-500 bg-red-950/30 ring-2 ring-red-500/50 shadow-md"
                  : "border-gray-800 bg-gray-900/60 hover:bg-gray-800 text-gray-300"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm border shadow-sm ${st.color}`}
              >
                {st.icon}
              </span>
              <div>
                <div className="text-xs font-bold text-white">{st.name}</div>
                <div className="text-[10px] text-gray-400">Tipo: {st.id}</div>
              </div>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setSelectedTool("ERASER")}
          className={`p-3 rounded-xl border flex items-center gap-3 text-left transition cursor-pointer ${
            selectedTool === "ERASER"
              ? "border-red-500 bg-red-950/30 ring-2 ring-red-500/50 shadow-md"
              : "border-gray-800 bg-gray-900/60 hover:bg-gray-800 text-gray-300"
          }`}
        >
          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm border border-gray-600 bg-gray-800 text-gray-400">
            🚫
          </span>
          <div>
            <div className="text-xs font-bold text-white">Pasillo / Borrar</div>
            <div className="text-[10px] text-gray-400">Elimina asiento</div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default SeatToolSelector;
