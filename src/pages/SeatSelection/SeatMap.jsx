import { useRef, useState } from "react";

function SeatMap({ seats, selectedSeats, onSelectSeat }) {
    const viewportRef = useRef(null);
    const mapRef = useRef(null);

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);

    const start = useRef({ x: 0, y: 0 });
    const initialPosition = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        // Solo permitir drag en responsive
        if (window.innerWidth >= 768) return;

        setDragging(true);

        start.current = {
            x: e.clientX,
            y: e.clientY
        };

        initialPosition.current = position;
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;

        const viewport = viewportRef.current;
        const map = mapRef.current;

        if (!viewport || !map) return;

        const dx = e.clientX - start.current.x;
        const dy = e.clientY - start.current.y;

        const viewportWidth = viewport.clientWidth;
        const viewportHeight = viewport.clientHeight;

        const mapWidth = map.offsetWidth;
        const mapHeight = map.offsetHeight;

        const maxX = Math.max(
            0,
            (mapWidth - viewportWidth) / 2
        );

        const maxY = Math.max(
            0,
            (mapHeight - viewportHeight) / 2
        );

        const newX = Math.max(
            -maxX,
            Math.min(
                initialPosition.current.x + dx,
                maxX
            )
        );

        const newY = Math.max(
            -maxY,
            Math.min(
                initialPosition.current.y + dy,
                maxY
            )
        );

        setPosition({
            x: newX,
            y: newY
        });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };


    // Bounding box de los asientos

    const minX = Math.min(...seats.map(s => s.positionX));
    const maxX = Math.max(...seats.map(s => s.positionX));

    const minY = Math.min(...seats.map(s => s.positionY));

    const columns = maxX - minX + 1;


    return (
        <div
            ref={viewportRef}
            className="
                w-full
                h-full
                min-h-fit
                lg:min-h-[70vh]
                overflow-hidden
                rounded-xl
            "
        >

            <div
                className={`
                    w-full
                    h-full
                    flex
                    flex-col
                    overflow-hidden

                    ${dragging
                        ? "cursor-grabbing"
                        : "cursor-grab md:cursor-default"
                    }
                `}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >

                <div
                    ref={mapRef}
                    className="
                        flex
                        flex-col
                        items-center
                        w-full
                        h-full
                    "
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px)`
                    }}
                >

                    {/* PANTALLA */}

                    <div className="w-[80%] max-w-125 pt-8 shrink-0">

                        <div
                            className="
                                h-2
                                rounded-full
                                bg-white
                                shadow-[0_0_20px_rgba(255,255,255,0.8)]
                            "
                        />

                        <p
                            className="
                                text-center
                                text-gray-400
                                text-xs
                                mt-2
                                tracking-[0.4em]
                            "
                        >
                            PANTALLA
                        </p>

                    </div>


                    {/* ASIENTOS */}

                    <div
                        className="
                            flex-1
                            w-full
                            flex
                            items-center
                            justify-center
                            p-6
                        "
                    >

                        <div
                            className="grid gap-2"
                            style={{
                                gridTemplateColumns:
                                    `repeat(${columns}, clamp(16px, 2.6vw, 28px))`
                            }}
                        >

                            {seats.map((seat) => (

                                <button
                                    key={seat.id}

                                    style={{
                                        gridColumn:
                                            seat.positionX - minX + 1,

                                        gridRow:
                                            seat.positionY - minY + 1
                                    }}

                                    disabled={
                                        seat.status === "occupied"
                                    }

                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectSeat(seat.id);
                                    }}

                                    className={`
                                        w-[clamp(16px,2.6vw,28px)]
                                        h-[clamp(14px,2.2vw,24px)]

                                        rounded-t-lg
                                        rounded-b-sm

                                        text-[clamp(6px,0.7vw,8px)]
                                        font-semibold
                                        transition

                                        ${
                                            seat.status === "occupied"
                                                ? "bg-gray-600"

                                                : selectedSeats.includes(seat.id)
                                                    ? "bg-green-400 scale-110"

                                                    : "bg-white hover:bg-green-400"
                                        }
                                    `}
                                >
                                    {seat.id}
                                </button>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default SeatMap;