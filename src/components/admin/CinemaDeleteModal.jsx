function CinemaDeleteModal({ cinemaId, onClose, onConfirm }) {
  if (!cinemaId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-(--color-card) border border-gray-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-3 border border-red-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
            <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880Z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white">¿Eliminar este cine?</h3>
        <p className="text-xs text-gray-400 mt-1 mb-6">
          Esta acción eliminará el cine y todas sus salas asociadas. No se puede deshacer.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 hover:bg-gray-800 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg cursor-pointer"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CinemaDeleteModal;
