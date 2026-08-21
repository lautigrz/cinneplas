import AvailabilityIndicator from "../../components/AvailabilityIndicator/AvailabilityIndicator";
import useDragScroll from "../../hooks/useDragScroll";
import { useState } from "react";
function ShowtimeSelection() {
    const {
        carouselRef,
        handleMouseDown,
        handleMouseMove,
        stopDragging,
    } = useDragScroll();

    const [selectedShowtime, setSelectedShowtime] = useState(1);

    const showtimes = [
        { id: 1, time: "10:00", availability: "high" },
        { id: 2, time: "12:30", availability: "medium" },
        { id: 3, time: "14:40", availability: "low" },
        { id: 4, time: "18:00", availability: "full" },
        { id: 5, time: "20:00", availability: "full" },
        { id: 6, time: "22:00", availability: "full" },
    ];
    return (
        <div className="flex gap-2 mt-5 w-full min-w-0 overflow-x-auto" ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}>

            {showtimes.map((showtime) => (
                <button 
                key={showtime.id}
                className={`flex items-center gap-1 px-5 py-2 bg-gray-600 hover:bg-red-700 rounded-lg text-sm
                ${selectedShowtime === showtime.id ? "bg-red-700" : ""}
                `}
                onClick={() => setSelectedShowtime(showtime.id)}
                >
                    <AvailabilityIndicator level={showtime.availability} />
                    <span>{showtime.time}</span>
                </button>
            ))}

        </div>
    )

}

export default ShowtimeSelection