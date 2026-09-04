function RoomSettingsForm({
  roomName,
  setRoomName,
  defaultPrice,
  setDefaultPrice,
  gridRows,
  setGridRows,
  gridCols,
  setGridCols,
  onGenerateDefaultLayout,
  onClearAll,
}) {
  return (
    <div className="bg-(--color-card) border border-gray-800 p-5 rounded-2xl space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-800 pb-2">
        1. Datos de la Sala
      </h3>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Nombre de la Sala
        </label>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:border-red-500 focus:outline-none"
          placeholder="Ej: Sala 1 VIP"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Precio base (STANDARD) <span className="text-gray-500">$</span>
        </label>
        <input
          type="number"
          min="0"
          step="100"
          value={defaultPrice}
          onChange={(e) => setDefaultPrice(Number(e.target.value) || 0)}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:border-red-500 focus:outline-none"
          placeholder="Ej: 3500"
        />
        <p className="text-[11px] text-gray-500 mt-1">VIP = ×1.5 · Premium = ×2</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Filas (Y)
          </label>
          <input
            type="number"
            min="5"
            max="30"
            value={gridRows}
            onChange={(e) =>
              setGridRows(Math.max(5, Math.min(30, parseInt(e.target.value) || 5)))
            }
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Columnas (X)
          </label>
          <input
            type="number"
            min="5"
            max="30"
            value={gridCols}
            onChange={(e) =>
              setGridCols(Math.max(5, Math.min(30, parseInt(e.target.value) || 5)))
            }
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:border-red-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="pt-2 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => onGenerateDefaultLayout(gridRows, gridCols)}
          className="w-full py-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-xs font-medium rounded-xl transition cursor-pointer text-gray-300"
        >
          ⚡ Generar Mapa Estándar
        </button>
        <button
          type="button"
          onClick={onClearAll}
          className="w-full py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-xs font-medium rounded-xl transition cursor-pointer text-red-300"
        >
          🧹 Limpiar Todo el Mapa
        </button>
      </div>
    </div>
  );
}

export default RoomSettingsForm;
