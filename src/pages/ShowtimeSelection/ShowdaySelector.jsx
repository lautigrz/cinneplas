import useDragScroll from "../../hooks/useDragScroll";
import { useState } from "react";
function ShowdaySelector({ idMovie }) {
    console.log(idMovie)

    const {
        carouselRef,
        handleMouseDown,
        handleMouseMove,
        stopDragging,
    } = useDragScroll();

    const [selectedDay, setSelectedDay] = useState("today");

    const days = [
        { id: "today", day: "HOY" },
        { id: "sat", day: "SAB", date: "22/AGO" },
        { id: "sun", day: "DOM", date: "23/AGO" },
        { id: "mon", day: "LUN", date: "24/AGO" },
        { id: "tue", day: "MAR", date: "25/AGO" },
    ];

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">
                HORARIOS
            </h2>


            <div className="w-full min-w-0 overflow-x-auto" ref={carouselRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}>
                <div className="flex w-max gap-3 pb-2">

                    {days.map((day) => (
                        <button
                            key={day.id}
                            className={`shrink-0 flex items-center gap-1 px-5 py-2 rounded-lg text-sm ${selectedDay === day.id
                                    ? "bg-red-700"
                                    : "bg-gray-600 hover:bg-red-700"
                                }`}
                            onClick={() => setSelectedDay(day.id)}
                        >
                            {day.date ? (
                                <>
                                    <span>{day.day}</span>
                                    <span>{day.date}</span>
                                </>
                            ) : (
                                <span>{day.day}</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )

}

export default ShowdaySelector