import { useRef, useState } from "react";

function SeatMap({ seats, selectedSeats, onSelectSeat }) {

    const mapRef = useRef(null);

    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const [dragging, setDragging] = useState(false);

    const start = useRef({ x: 0, y: 0 });
    const initialPosition = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setDragging(true);

        start.current = {
            x: e.clientX,
            y: e.clientY
        };

        initialPosition.current = position;
    };

    const handleMouseMove = (e) => {

        if (!dragging) return;

        const dx = e.clientX - start.current.x;
        const dy = e.clientY - start.current.y;

        setPosition({
            x: initialPosition.current.x + dx,
            y: initialPosition.current.y + dy
        });
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const zoomIn = () => {
        setZoom((z) => Math.min(z + 0.2, 2.5));
    };

    const zoomOut = () => {
        setZoom((z) => Math.max(z - 0.2, 0.5));
    };

    return (
        <div className="relative w-full h-175 overflow-hidden bg-gray-950 rounded-xl">

            {/* CONTROLES */}
            <div className="absolute z-20 top-4 right-4 flex flex-col gap-2">

                <button
                    onClick={zoomIn}
                    className="w-10 h-10 bg-gray-800 text-white rounded-lg"
                >
                    +
                </button>

                <button
                    onClick={zoomOut}
                    className="w-10 h-10 bg-gray-800 text-white rounded-lg"
                >
                    −
                </button>

            </div>


            {/* VIEWPORT */}

            <div
                ref={mapRef}
                className={`
                    w-full h-full
                    flex items-center justify-center
                    ${dragging ? "cursor-grabbing" : "cursor-grab"}
                `}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >

                {/* MAPA */}

                <div
                    style={{
                        transform: `
                            translate(${position.x}px, ${position.y}px)
                            scale(${zoom})
                        `,
                    }}
                    className="flex flex-col items-center gap-10"
                >

                    {/* PANTALLA */}

                    <div className="w-175">

                        <div className="
                            h-3
                            rounded-full
                            bg-white
                            shadow-[0_0_30px_rgba(255,255,255,0.8)]
                        "/>

                        <p className="
                            text-center
                            text-gray-400
                            text-sm
                            mt-3
                            tracking-[0.5em]
                        ">
                            PANTALLA
                        </p>

                    </div>


                    {/* ASIENTOS */}

                    <div
                        className="grid gap-3"
                        style={{
                            gridTemplateColumns:
                                "repeat(16, 45px)"
                        }}
                    >

                        {seats.map((seat) => (

                            <button
                                key={seat.id}

                                style={{
                                    gridColumn: seat.positionX,
                                    gridRow: seat.positionY
                                }}

                                disabled={
                                    seat.status === "occupied"
                                }

                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectSeat(seat.id);
                                }}

                                className={`
                                    w-11 h-9
                                    rounded-t-xl rounded-b-md
                                    text-[10px]
                                    font-semibold
                                    transition

                                    ${
                                        seat.status === "occupied"
                                            ? "bg-gray-600"
                                            : selectedSeats.includes(seat.id)
                                                ? "bg-red-500 scale-110"
                                                : "bg-green-500 hover:bg-green-400"
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
    );
}

export default SeatMap;