function CinemaEditModal({ cinema, onClose, onSubmit, formData, onFormChange }) {
  if (!cinema) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-(--color-card) border border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white">Editar Cine #{cinema.id}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer">✕</button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Nombre</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => onFormChange("name", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Dirección</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => onFormChange("address", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500/50"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-400 hover:text-white cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold shadow-lg cursor-pointer"
            >
              Actualizar Cine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CinemaEditModal;
