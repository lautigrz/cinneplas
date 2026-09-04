const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function DigitalTicketModal({
  bookingCode,
  movie,
  selectedDay,
  selectedShowtime,
  selectedSeats,
  roomName,
  buyerName,
  buyerEmail,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-md bg-linear-to-b from-[#1c1815] to-[#0d0b0a] border border-red-900/40 rounded-3xl shadow-2xl overflow-hidden text-white my-8 animate-in zoom-in-95 duration-200">

        <div className="bg-linear-to-r from-red-600 to-red-700 p-6 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <span className="inline-block px-3 py-1 bg-black/30 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest uppercase text-white/90 mb-2 border border-white/10">
            TICKET DIGITAL CINEPLAS
          </span>
          <h2 className="text-xl font-black text-white uppercase tracking-wide">
            ¡Compra Confirmada!
          </h2>
          <p className="text-xs text-red-100/80 mt-1">
            Código de reserva: <strong className="font-mono text-white tracking-wider text-sm">{bookingCode}</strong>
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-4 items-center bg-gray-900/80 p-3.5 rounded-2xl border border-gray-800">
            {movie?.poster_path && (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-16 h-24 object-cover rounded-xl shadow-md shrink-0 border border-gray-800"
              />
            )}
            <div className="space-y-1 min-w-0">
              <h3 className="font-extrabold text-white text-base leading-tight truncate">
                {movie?.title || "Película"}
              </h3>
              <p className="text-xs text-gray-400">
                Sala: <span className="text-amber-400 font-bold">{roomName || "Sala 1 - IMAX 3D"}</span>
              </p>
              <p className="text-xs text-gray-400">
                Fecha: <span className="text-white font-semibold">{selectedDay?.day || "Hoy"}</span>
              </p>
              <p className="text-xs text-gray-400">
                Horario: <span className="text-red-400 font-semibold">{selectedShowtime?.time || "19:00 hs"}</span>
              </p>
            </div>
          </div>

          <div className="bg-red-950/30 border border-red-900/40 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 block font-medium">Butacas Asignadas</span>
              <span className="text-base font-extrabold text-red-400">
                {selectedSeats?.join(", ")}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 block font-medium">Titular</span>
              <span className="text-xs font-bold text-gray-200">{buyerName || "Cliente"}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl text-black space-y-2 shadow-xl">
            <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
              <rect width="100" height="100" fill="white" />
              <path d="M10 10h30v30H10zM60 10h30v30H60zM10 60h30v30H10z" fill="black" />
              <path d="M18 18h14v14H18zM68 18h14v14H68zM18 68h14v14H18z" fill="white" />
              <path d="M50 10h10v10H50zM45 25h15v5H45zM50 60h20v5H50zM65 45h10v20H65zM80 60h10v30H80zM50 75h30v15H50z" fill="black" />
            </svg>
            <span className="text-[10px] font-mono text-gray-600 tracking-widest font-bold">
              ESCANEAR EN EL INGRESO A SALA
            </span>
          </div>

          <p className="text-[11px] text-gray-400 text-center">
            Enviamos una copia con el comprobante y código QR a <strong>{buyerEmail || "tu correo"}</strong>.
          </p>

          <button
            onClick={onClose}
            className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-red-900/40 transition-all cursor-pointer text-sm"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default DigitalTicketModal;
