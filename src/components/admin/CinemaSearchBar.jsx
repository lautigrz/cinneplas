function CinemaSearchBar({ searchTerm, setSearchTerm, filteredCount, totalCount }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <div className="relative w-full sm:w-96">
        <input
          type="text"
          placeholder="Buscar por nombre o dirección..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-(--color-card) border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
        />
        <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-lg">
          search
        </span>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-white cursor-pointer"
          >
            Limpiar
          </button>
        )}
      </div>

      <p className="text-xs text-gray-400 self-end sm:self-center">
        Mostrando {filteredCount} de {totalCount} cines
      </p>
    </div>
  );
}

export default CinemaSearchBar;
