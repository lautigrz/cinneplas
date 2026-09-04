function JsonPayloadModal({
  isOpen,
  onClose,
  saveStatus,
  seatsList,
}) {
  if (!isOpen) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(seatsList, null, 2));
    alert("¡JSON de asientos copiado al portapapeles!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-(--color-card) border border-gray-800 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-lg font-bold">Estructura Generada para Base de Datos</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        {saveStatus && (
          <div
            className={`p-3 rounded-xl text-xs font-medium border ${
              saveStatus.type === "success"
                ? "bg-emerald-950/80 border-emerald-800 text-emerald-200"
                : "bg-red-950/80 border-red-800 text-red-200"
            }`}
          >
            {saveStatus.message}
          </div>
        )}

        <p className="text-xs text-gray-400">
          Esta es la lista de asientos formateada exactamente con las columnas requeridas (id, room_id, row, number, position_x, position_y, type, is_active):
        </p>

        <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 font-mono text-xs text-emerald-400 max-h-72 overflow-y-auto custom-scrollbar">
          <pre>{JSON.stringify(seatsList.slice(0, 5), null, 2)}</pre>
          {seatsList.length > 5 && (
            <div className="text-center text-gray-500 my-2">
              ... y {seatsList.length - 5} asientos más ...
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={handleCopyJson}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-xs font-medium cursor-pointer"
          >
            📋 Copiar Payload JSON
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

export default JsonPayloadModal;
