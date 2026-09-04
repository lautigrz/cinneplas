import { useState } from "react";

export function AddShowtimeModal({ isOpen, onClose, movies, cinemas, onAddShowtime }) {
  const [newShowtime, setNewShowtime] = useState({
    movieTitle: "",
    cinemaId: "",
    roomId: "",
    time: "19:00",
    date: new Date().toISOString().split("T")[0],
    price: 4500,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCinema = cinemas.find((c) => String(c.id) === String(newShowtime.cinemaId));
    const selectedRoom = selectedCinema?.rooms?.find((r) => String(r.id) === String(newShowtime.roomId));

    if (!newShowtime.movieTitle || !selectedCinema || !selectedRoom) {
      alert("Selecciona película, cine y sala válidos.");
      return;
    }

    onAddShowtime({
      movieTitle: newShowtime.movieTitle,
      cinemaName: selectedCinema.name,
      roomName: selectedRoom.name,
      time: newShowtime.time,
      date: newShowtime.date,
      price: Number(newShowtime.price),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-(--color-card) border border-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <h3 className="text-lg font-bold text-white mb-4">🎟️ Programar Nueva Función</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Película</label>
            <select
              required
              value={newShowtime.movieTitle}
              onChange={(e) => setNewShowtime({ ...newShowtime, movieTitle: e.target.value })}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
            >
              <option value="">-- Selecciona una película --</option>
              {movies.map((m, idx) => (
                <option key={idx} value={m.title || m.original_title}>
                  {m.title || m.original_title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Cine / Sede</label>
              <select
                required
                value={newShowtime.cinemaId}
                onChange={(e) => setNewShowtime({ ...newShowtime, cinemaId: e.target.value, roomId: "" })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
              >
                <option value="">-- Selecciona Cine --</option>
                {cinemas.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Sala</label>
              <select
                required
                disabled={!newShowtime.cinemaId}
                value={newShowtime.roomId}
                onChange={(e) => setNewShowtime({ ...newShowtime, roomId: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none disabled:opacity-50"
              >
                <option value="">-- Selecciona Sala --</option>
                {cinemas
                  .find((c) => String(c.id) === String(newShowtime.cinemaId))
                  ?.rooms?.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.capacity} cap)
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Fecha</label>
              <input
                type="date"
                required
                value={newShowtime.date}
                onChange={(e) => setNewShowtime({ ...newShowtime, date: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Horario</label>
              <input
                type="time"
                required
                value={newShowtime.time}
                onChange={(e) => setNewShowtime({ ...newShowtime, time: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Precio ($)</label>
              <input
                type="number"
                required
                value={newShowtime.price}
                onChange={(e) => setNewShowtime({ ...newShowtime, price: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs text-gray-400 cursor-pointer">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold cursor-pointer">
              Programar Función
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
