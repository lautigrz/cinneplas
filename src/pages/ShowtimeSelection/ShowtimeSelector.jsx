import AvailabilityIndicator from "../../components/AvailabilityIndicator/AvailabilityIndicator";
import useDragScroll from "../../hooks/useDragScroll";

function ShowtimeSelection({ selectedShowtime, setSelectedShowtime }) {
    const {
        carouselRef,
        handleMouseDown,
        handleMouseMove,
        stopDragging,
        handleWheel
    } = useDragScroll();

    const showtimes = [
        { id: 1, time: "10:00", availability: "high" },
        { id: 2, time: "12:30", availability: "medium" },
        { id: 3, time: "14:40", availability: "low" },
        { id: 4, time: "18:00", availability: "full" },
        { id: 5, time: "20:00", availability: "full" },
        { id: 6, time: "22:00", availability: "full" },
    ];

    return (
        <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onWheel={handleWheel}
            className="w-full mt-4 overflow-x-auto scrollbar-hide py-2 touch-pan-x cursor-grab active:cursor-grabbing select-none"
        >
            <div className="flex w-max gap-3 pr-4">
                {showtimes.map((showtime) => (
                    <button
                        key={showtime.id}
                        className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all cursor-pointer touch-manipulation ${
                            selectedShowtime?.id === showtime.id
                                ? "bg-red-600 text-white font-extrabold shadow-lg scale-105"
                                : "bg-gray-800 text-gray-300 font-bold hover:bg-gray-700 hover:text-white"
                        }`}
                        onClick={() => setSelectedShowtime(showtime)}
                    >
                        <AvailabilityIndicator level={showtime.availability} />
                        <span className="font-extrabold tracking-wider">{showtime.time}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ShowtimeSelection;