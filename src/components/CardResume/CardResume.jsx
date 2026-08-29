const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function CardResume({ resume, selectedDay, selectedShowtime, tickets, totalPrice, selectedSeats }) {
    const hasSelectedTickets = tickets && Object.values(tickets).some((item) => item.quantity > 0);

    return (
        <div className="flex flex-col gap-4 p-4 rounded-2xl bg-(--color-card) border border-gray-800 shadow-xl lg:max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">

            {/* Header: Afiche y Título / Fecha / Hora */}
            <div className="flex flex-row sm:flex-col gap-4 items-start sm:items-stretch w-full">
                {resume?.poster_path && (
                    <img
                        src={`${IMAGE_URL}${resume.poster_path}`}
                        alt={resume.title || "Poster"}
                        className="w-24 h-36 sm:w-full sm:h-72 object-cover rounded-xl shadow-md shrink-0"
                    />
                )}

                <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                        {resume?.title || "Película"}
                    </h3>

                    {selectedDay?.day ? (
                        <div className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
                            <span className="text-gray-400 font-medium">Fecha:</span>
                            <span className="text-amber-400 font-bold">{selectedDay.day}</span>
                        </div>
                    ) : (
                        <div className="text-gray-500 text-xs italic">Fecha no seleccionada</div>
                    )}

                    {selectedShowtime?.time ? (
                        <div className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
                            <span className="text-gray-400 font-medium">Hora:</span>
                            <span className="text-red-400 font-bold">{selectedShowtime.time}</span>
                        </div>
                    ) : (
                        <div className="text-gray-500 text-xs italic">Hora no seleccionada</div>
                    )}
                </div>
            </div>

            {/* Resumen de Entradas */}
            {hasSelectedTickets && (
                <div className="border-t border-gray-800 pt-3 flex flex-col gap-2">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Entradas</h4>
                    {Object.entries(tickets).map(([type, item]) => (
                        item.quantity > 0 && (
                            <div key={type} className="flex justify-between items-center text-sm text-gray-300">
                                <span>{item.quantity}x {item.name}</span>
                                <span className="font-semibold text-white">${(item.quantity * item.price).toFixed(2)}</span>
                            </div>
                        )
                    ))}
                </div>
            )}

            {/* Resumen de Asientos Seleccionados */}
            {selectedSeats && selectedSeats.length > 0 && (
                <div className="border-t border-gray-800 pt-3 flex flex-col gap-1">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Butacas</h4>
                    <p className="text-sm font-semibold text-red-400 wrap-break">{selectedSeats.join(", ")}</p>
                </div>
            )}

            {/* Total de Precio */}
            {totalPrice !== undefined && totalPrice > 0 && (
                <div className="border-t border-gray-800 pt-3 flex justify-between items-center mt-auto">
                    <span className="text-base font-bold text-white">Total:</span>
                    <span className="text-2xl font-black text-red-500">${totalPrice.toFixed(2)}</span>
                </div>
            )}
        </div>
    );
}

export default CardResume;