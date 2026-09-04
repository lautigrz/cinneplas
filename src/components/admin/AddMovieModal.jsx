import { useState } from "react";

export function AddMovieModal({ isOpen, onClose, onAddMovie }) {
  const [newMovie, setNewMovie] = useState({ title: "", genre: "", duration: "", poster: "" });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMovie.title) return;
    onAddMovie(newMovie);
    setNewMovie({ title: "", genre: "", duration: "", poster: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-(--color-card) border border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <h3 className="text-lg font-bold text-white mb-4">🎬 Agregar Nueva Película al Catálogo</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Título</label>
            <input
              type="text"
              required
              placeholder="Ej: Inception"
              value={newMovie.title}
              onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Género</label>
            <input
              type="text"
              placeholder="Ej: Sci-Fi / Acción"
              value={newMovie.genre}
              onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Duración (minutos)</label>
            <input
              type="number"
              placeholder="148"
              value={newMovie.duration}
              onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs text-gray-400 cursor-pointer">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold cursor-pointer">
              Guardar Película
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
