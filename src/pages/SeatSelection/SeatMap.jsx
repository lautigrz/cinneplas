function SeatMap({ seats, selectedSeats, onSelectSeat }) {
    if (!seats || seats.length === 0) return null;

    const minX = Math.min(...seats.map((s) => s.positionX));
    const maxX = Math.max(...seats.map((s) => s.positionX));
    const minY = Math.min(...seats.map((s) => s.positionY));
    const columns = maxX - minX + 1;

    const getDynamicSizing = (totalCols, seatCount) => {
        if (totalCols >= 22 || seatCount >= 300) {
            return {
                seatSize: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[7px] sm:text-[9px] rounded-t-sm",
                gridContainer: "gap-1 sm:gap-1.5 lg:gap-2 p-2 sm:p-3.5",
            };
        }
        if (totalCols >= 15 || seatCount >= 150) {
            return {
                seatSize: "w-6 h-6 sm:w-7.5 sm:h-7.5 lg:w-8.5 lg:h-8.5 text-[8px] sm:text-[10px] rounded-t-md",
                gridContainer: "gap-1.5 sm:gap-2 lg:gap-2.5 p-3 sm:p-4",
            };
        }
        return {
            seatSize: "w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-[9px] sm:text-xs rounded-t-lg",
            gridContainer: "gap-2.5 sm:gap-3 lg:gap-4 p-4 sm:p-6",
        };
    };

    const sizing = getDynamicSizing(columns, seats.length);

    const getSeatStyle = (seat, isSelected, isOccupied) => {
        if (isOccupied) {
            return "bg-gray-800/90 text-gray-600 cursor-not-allowed border border-gray-800 shadow-none";
        }
        if (isSelected) {
            return "bg-gradient-to-t from-green-600 to-green-400 text-black font-black scale-110 shadow-[0_0_12px_rgba(34,197,94,0.9)] ring-2 ring-white border-green-300 z-10";
        }

        switch (seat.type) {
            case "VIP":
                return "bg-gradient-to-t from-amber-600 to-amber-400 text-black font-extrabold hover:bg-green-400 hover:text-black border border-amber-300 shadow-[0_2px_6px_rgba(245,158,11,0.25)] hover:scale-105";
            case "WHEELCHAIR":
                return "bg-gradient-to-t from-purple-700 to-purple-500 text-white font-extrabold hover:bg-green-400 hover:text-black border border-purple-400 shadow-[0_2px_6px_rgba(168,85,247,0.25)] hover:scale-105";
            case "PREMIUM":
                return "bg-gradient-to-t from-red-700 to-red-500 text-white font-extrabold hover:bg-green-400 hover:text-black border border-red-400 shadow-[0_2px_6px_rgba(239,68,68,0.25)] hover:scale-105";
            default:
                return "bg-gradient-to-t from-gray-300 to-gray-100 text-gray-900 font-extrabold hover:bg-green-400 hover:text-black border border-white/60 shadow-[0_1px_4px_rgba(255,255,255,0.1)] hover:scale-105";
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-6">


            <div className="relative w-full p-4 sm:p-8 lg:p-10 bg-liner-to-b from-[#161411] via-[#0f0e0c] to-[#090807] rounded-3xl border border-gray-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center justify-center">

                <div className="absolute top-0 inset-x-0 h-40 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-red-500/20 via-red-900/5 to-transparent pointer-events-none" />
                <div className="absolute -left-1 top-1/4 bottom-1/4 w-2 bg-linear-to-b from-red-500/20 via-red-500/40 to-transparent blur-sm rounded-r-full" />
                <div className="absolute -right-1 top-1/4 bottom-1/4 w-2 bg-linear-to-b from-red-500/20 via-red-500/40 to-transparent blur-sm rounded-l-full" />

                <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">

                    <div className="w-full flex flex-col items-center pt-2 pb-6 sm:pb-10">

                        <div className="relative w-full max-w-2xl sm:max-w-4xl">
                            <div className="w-full h-3 sm:h-4 rounded-full bg-linear-to-r from-red-600 via-white to-red-600 shadow-[0_0_25px_rgba(239,68,68,0.9),0_0_12px_rgba(255,255,255,0.8)]" />

                            <div className="w-full h-10 bg-linear-to-b from-white/15 via-red-500/10 to-transparent blur-md -mt-1" />
                        </div>
                        <p className="text-center text-gray-300 text-xs sm:text-sm mt-2 tracking-[0.4em] sm:tracking-[0.5em] font-black uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center gap-3">
                            <span className="w-8 sm:w-16 h-px bg-linear-to-r from-transparent to-red-500/60" />
                            <span>PANTALLA DE CINE</span>
                            <span className="w-8 sm:w-16 h-px bg-linear-to-l from-transparent to-red-500/60" />
                        </p>
                    </div>


                    <div className="w-full overflow-x-auto custom-scrollbar pb-4 flex justify-center">
                        <div
                            className={`grid ${sizing.gridContainer} bg-gray-950/80 rounded-2xl border border-gray-800/80 shadow-2xl backdrop-blur-sm justify-center`}
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
                                            aspect-square ${sizing.seatSize} mx-auto
                                            rounded-b-2xs font-black
                                            flex items-center justify-center
                                            transition-all duration-200 cursor-pointer touch-manipulation select-none
                                            ${getSeatStyle(seat, isSelected, isOccupied)}
                                        `}
                                        title={`Butaca ${seat.id} (${seat.type || "Estándar"})`}
                                    >
                                        {seat.id}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs font-semibold text-gray-300 bg-gray-900/60 px-6 py-3 rounded-2xl border border-gray-800">
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-t-md bg-gray-200 border border-white/50 shadow-sm" />
                    <span>Estándar</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-t-md bg-amber-500 border border-amber-300 shadow-sm" />
                    <span>VIP</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-t-md bg-purple-600 border border-purple-400 shadow-sm" />
                    <span>Accesible</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-t-md bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] border border-green-300" />
                    <span>Seleccionada</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-t-md bg-gray-800 border border-gray-700" />
                    <span>Ocupada</span>
                </div>
            </div>
        </div>
    );
}

export default SeatMap;