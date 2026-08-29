function SeatMap({ seats, selectedSeats, onSelectSeat }) {
    if (!seats || seats.length === 0) return null;

    const minX = Math.min(...seats.map((s) => s.positionX));
    const maxX = Math.max(...seats.map((s) => s.positionX));
    const minY = Math.min(...seats.map((s) => s.positionY));
    const columns = maxX - minX + 1;

    return (
        <div className="w-full flex flex-col items-center gap-4 sm:gap-6">
            {/* Contenedor del Mapa (se ajusta al 100% sin zoom ni scrollbars) */}
            <div className="w-full p-2 sm:p-8 bg-(--color-card)/50 rounded-2xl border border-gray-800/80 flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl flex flex-col items-center">

                    {/* PANTALLA DEL CINE */}
                    <div className="w-full flex flex-col items-center pt-1 pb-5 sm:pb-8">
                        <div className="w-3/4 max-w-xs sm:max-w-md h-1.5 sm:h-2 rounded-full bg-linear-to-r from-red-600 via-white to-red-600 shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                        <p className="text-center text-gray-300 text-[10px] sm:text-sm mt-2 tracking-[0.3em] sm:tracking-[0.4em] font-black uppercase drop-shadow">
                            PANTALLA
                        </p>
                    </div>

                    {/* MAPA DE BUTACAS (Súper compacto y adaptable en móvil) */}
                    <div
                        className="grid gap-1 sm:gap-2.5 w-full max-w-[95%] sm:max-w-lg mx-auto justify-center"
                        style={{
                            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
                        }}
                    >
                        {seats.map((seat) => {
                            const isOccupied = seat.status === "occupied";
                            const isSelected = selectedSeats.includes(seat.id);

                            return (
                                <button
                                    key={seat.id}
                                    style={{
                                        gridColumn: seat.positionX - minX + 1,
                                        gridRow: seat.positionY - minY + 1
                                    }}
                                    disabled={isOccupied}
                                    onClick={() => onSelectSeat(seat.id)}
                                    className={`
                                        aspect-square w-full max-w-[22px] sm:max-w-[36px] min-w-[14px] sm:min-w-[20px] mx-auto
                                        rounded-t-xs sm:rounded-t-md rounded-b-3xs
                                        text-[7px] sm:text-xs font-extrabold
                                        flex items-center justify-center
                                        transition-all duration-200 cursor-pointer touch-manipulation
                                        ${
                                            isOccupied
                                                ? "bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-800"
                                                : isSelected
                                                    ? "bg-green-500 text-black font-extrabold scale-110 shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                                                    : "bg-gray-200 text-gray-900 hover:bg-green-400 hover:text-black"
                                        }
                                    `}
                                    title={`Butaca ${seat.id}`}
                                >
                                    {seat.id}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* LEYENDA DE ESTADOS */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-semibold text-gray-300 pt-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-t-sm rounded-b-xs bg-gray-200 border border-white/20" />
                    <span>Disponible</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-t-sm rounded-b-xs bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <span>Seleccionada</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-t-sm rounded-b-xs bg-gray-700 border border-gray-800" />
                    <span>Ocupada</span>
                </div>
            </div>
        </div>
    );
}

export default SeatMap;