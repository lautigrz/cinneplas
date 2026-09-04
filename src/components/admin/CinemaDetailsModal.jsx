import { useNavigate } from "react-router";

function CinemaDetailsModal({
  cinema,
  onClose,
  newRoomForm,
  setNewRoomForm,
  onDeleteRoom
}) {
  const navigate = useNavigate();
  if (!cinema) return null;

  const handleDesignRoom = (roomName) => {
    onClose();
    navigate("/admin/create-room", {
      state: {
        cinemaIdPublic: cinema.idPublic,
        cinemaName: cinema.name,
        roomName: roomName || "",
      },
    });
  };

  const handleNewRoomSubmit = (e) => {
    e.preventDefault();
    if (!newRoomForm.name.trim()) {
      alert("Ingresa un nombre válido para la sala.");
      return;
    }
    handleDesignRoom(newRoomForm.name.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-(--color-card) border border-gray-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-red-500/10 text-red-400 font-mono px-2 py-0.5 rounded border border-red-500/20">
                ID: {cinema.idPublic}
              </span>
              <span className="text-xs text-gray-400">
                Creado: {new Date(cinema.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">{cinema.name}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{cinema.address}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Salas asociadas ({cinema.rooms?.length || 0})</span>
            <span className="text-xs text-gray-400 font-normal">Esquema CinemaRoom</span>
          </h3>

          {cinema.rooms && cinema.rooms.length > 0 ? (
            <div className="space-y-2.5 mb-4">
              {cinema.rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-gray-900/90 border border-gray-800 p-3.5 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>🎬 {room.name}</span>
                      <span className="text-[10px] text-gray-500 font-mono">ID #{room.id}</span>
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDesignRoom(room.name)}
                      className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-200 px-2.5 py-1.5 rounded-lg border border-gray-700 transition-colors cursor-pointer"
                    >
                      Diseñar Asientos
                    </button>
                    <button
                      onClick={() => onDeleteRoom(room.id)}
                      className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Eliminar sala"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="currentColor">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic mb-4 bg-gray-900/40 p-3 rounded-xl border border-gray-800">
              Este cine aún no tiene salas creadas.
            </p>
          )}

          <form onSubmit={handleNewRoomSubmit} className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800">
            <h4 className="text-xs font-bold text-gray-300 uppercase mb-1">Añadir nueva sala</h4>
            <p className="text-[11px] text-gray-500 mb-2">Ingresa el nombre y serás redirigido al diseñador de asientos.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Nombre de la sala (ej: Sala 2 VIP)"
                value={newRoomForm.name}
                onChange={(e) => setNewRoomForm((prev) => ({ ...prev, name: e.target.value }))}
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500/50"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960" width="14" fill="currentColor">
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
                Diseñar Sala
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end border-t border-gray-800 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CinemaDetailsModal;

