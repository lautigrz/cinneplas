const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function OrderSummaryCard({
  movie,
  selectedDay,
  selectedShowtime,
  tickets,
  totalPrice,
  selectedSeats,
  roomName,
}) {
  const serviceFee = totalPrice ? totalPrice * 0.1 : 0;
  const finalTotal = (totalPrice || 0) + serviceFee;

  return (
    <div className="bg-(--color-card) border border-gray-800 rounded-3xl p-6 shadow-2xl space-y-5">
      <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
        <span className="text-red-500 text-lg">🎟️</span>
        <h3 className="text-lg font-bold text-white">Resumen de tu Compra</h3>
      </div>

      <div className="flex gap-4 items-center">
        {movie?.poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-20 h-28 object-cover rounded-xl shadow-md shrink-0 border border-gray-800"
          />
        ) : (
          <div className="w-20 h-28 bg-gray-900 rounded-xl flex items-center justify-center text-gray-600 text-xs">
            Sin Afiche
          </div>
        )}

        <div className="space-y-1 text-sm min-w-0">
          <h4 className="font-extrabold text-white text-base leading-tight truncate">
            {movie?.title || "Película seleccionada"}
          </h4>
          
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <span className="text-gray-400">Fecha:</span>
            <span className="text-amber-400 font-semibold">{selectedDay?.day || "Hoy"}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-300">
            <span className="text-gray-400">Hora:</span>
            <span className="text-red-400 font-semibold">{selectedShowtime?.time || "19:00 hs"}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-300">
            <span className="text-gray-400">Sala:</span>
            <span className="text-emerald-400 font-semibold">{roomName || "Sala 1 - IMAX 3D"}</span>
          </div>
        </div>
      </div>

      {/* Butacas */}
      {selectedSeats && selectedSeats.length > 0 && (
        <div className="bg-gray-900/80 p-3.5 rounded-2xl border border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Butacas Seleccionadas</span>
            <span className="text-sm font-extrabold text-red-400">
              {selectedSeats.join(", ")}
            </span>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 bg-red-500/20 text-red-300 rounded-full border border-red-500/30">
            {selectedSeats.length} {selectedSeats.length === 1 ? "Butaca" : "Butacas"}
          </span>
        </div>
      )}

      {/* Desglose de Precios */}
      <div className="space-y-2 text-xs text-gray-300 border-t border-gray-800 pt-4">
        {tickets &&
          Object.entries(tickets).map(([type, item]) => (
            item.quantity > 0 && (
              <div key={type} className="flex justify-between items-center">
                <span>{item.quantity}x {item.name}</span>
                <span className="font-semibold text-white">${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            )
          ))}

        <div className="flex justify-between items-center text-gray-400 pt-1">
          <span>Cargo por Servicio Web (10%)</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
      </div>

      {/* Total Final */}
      <div className="border-t border-gray-800 pt-4 flex justify-between items-center">
        <div>
          <span className="text-xs text-gray-400 block">Total a pagar</span>
          <span className="text-2xl font-black text-red-500">${finalTotal.toFixed(2)}</span>
        </div>
        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-lg">
          Impuestos incluidos
        </span>
      </div>
    </div>
  );
}

export default OrderSummaryCard;
