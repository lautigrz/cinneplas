import useDragScroll from "../../hooks/useDragScroll";

function ShowdaySelector({ selectedDay, setSelectedDay }) {
    const {
        carouselRef,
        handleMouseDown,
        handleMouseMove,
        stopDragging,
        handleWheel
    } = useDragScroll();

    const days = [
        { id: "today", day: "HOY" },
        { id: "sat", day: "SAB", date: "22/AGO" },
        { id: "sun", day: "DOM", date: "23/AGO" },
        { id: "mon", day: "LUN", date: "24/AGO" },
        { id: "tue", day: "MAR", date: "25/AGO" },
    ];

    return (
        <div className="w-full">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">
                HORARIOS
            </h2>

            {/* Contenedor con Scroll por Rueda/Arrastre en Desktop y Touch Nativo en Móvil */}
            <div
                ref={carouselRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}
                onWheel={handleWheel}
                className="w-full overflow-x-auto scrollbar-hide py-2 touch-pan-x cursor-grab active:cursor-grabbing select-none"
            >
                <div className="flex w-max gap-3 pr-4">
                    {days.map((day) => (
                        <button
                            key={day.id}
                            className={`shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm transition-all cursor-pointer touch-manipulation ${selectedDay?.id === day.id
                                    ? "bg-red-600 text-white font-extrabold shadow-lg scale-105"
                                    : "bg-gray-800 text-gray-300 font-bold hover:bg-gray-700 hover:text-white"
                                }`}
                            onClick={() => setSelectedDay(day)}
                        >
                            {day.date ? (
                                <>
                                    <span className="font-extrabold">{day.day}</span>
                                    <span className="text-xs opacity-90">{day.date}</span>
                                </>
                            ) : (
                                <span className="font-extrabold tracking-wider">{day.day}</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ShowdaySelector;