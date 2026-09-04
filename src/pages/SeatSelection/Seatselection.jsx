import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";

import SeatMap from "./SeatMap";
import CardResume from "../../components/CardResume/CardResume";
import { fetchMovieDetails } from "../../services/tmdb.js";
import roomService from "../../services/roomService.js";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import BackButton from "../../components/ui/BackButton";

function SeatSelection() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const { selectedDay, selectedShowtime, tickets, totalTickets, totalPrice, selectedSeats: initialSeats } = location.state || {};

    const [selectedSeats, setSelectedSeats] = useState(initialSeats || []);
    const [movieDetails, setMovieDetails] = useState(null);
    const [seats, setSeats] = useState([]);
    const [roomInfo, setRoomInfo] = useState(null);

    useEffect(() => {
        async function loadMovieDetails() {
            try {
                const details = await fetchMovieDetails(id);
                setMovieDetails(details);
            } catch (error) {
                console.error("Error loading movie details:", error);
            }
        }

        if (id) {
            loadMovieDetails();
        }
    }, [id]);

    useEffect(() => {
        const savedRooms = roomService.getStoredRooms();

        if (savedRooms && savedRooms.length > 0) {
            const activeRoom = savedRooms[savedRooms.length - 1];
            setRoomInfo(activeRoom);

            if (activeRoom.seats && activeRoom.seats.length > 0) {
                const formattedSeats = activeRoom.seats.map((s) => ({
                    id: s.row && s.number ? `${s.row}${s.number}` : s.id,
                    rawId: s.id,
                    row: s.row,
                    number: s.number,
                    positionX: s.position_x !== undefined ? s.position_x + 1 : s.positionX,
                    positionY: s.position_y !== undefined ? s.position_y + 1 : s.positionY,
                    type: s.type || "STANDARD",
                    status: s.is_active !== false ? "available" : "occupied",
                }));
                setSeats(formattedSeats);
                return;
            }
        }

        setSeats(DEFAULT_SEATS);
    }, []);

    if (!movieDetails) {
        return <LoadingSpinner message="Cargando mapa de butacas..." />;
    }

    const handleSelectSeat = (seatId) => {
        setSelectedSeats((prev) => {
            if (prev.includes(seatId)) {
                return prev.filter((id) => id !== seatId);
            }
            if (totalTickets && prev.length >= totalTickets) {
                return prev;
            }

            return [...prev, seatId];
        });
    };

    const handleBackToTickets = () => {
        navigate(`/tickets/${id}`, {
            state: {
                selectedDay,
                selectedShowtime,
                tickets,
                selectedSeats
            }
        });
    };

    const handleGoToCheckout = () => {
        navigate(`/checkout/${id}`, {
            state: {
                selectedDay,
                selectedShowtime,
                tickets,
                totalPrice,
                selectedSeats,
                movieDetails,
                roomInfo
            }
        });
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen items-start justify-start gap-6 bg-(--color-background) p-4 md:p-6 shadow-lg">

            <div className="flex-1 w-full min-w-0">
                <BackButton label="Volver a entradas" onClick={handleBackToTickets} />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <h1 className="font-bold text-white text-2xl md:text-3xl">SELECCIONA TU BUTACA</h1>

                    {roomInfo ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold rounded-full w-fit">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span>Sala: {roomInfo.name} ({seats.length} asientos cargados desde localStorage)</span>
                        </div>
                    ) : (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-full w-fit">
                            <span>Sala Predeterminada</span>
                        </div>
                    )}
                </div>

                <div className="overflow-x-auto pb-2 custom-scrollbar">
                    <SeatMap
                        seats={seats}
                        selectedSeats={selectedSeats}
                        onSelectSeat={handleSelectSeat}
                    />
                </div>
            </div>

            <div className="w-full lg:w-80 shrink-0 mt-2 lg:mt-0 flex flex-col gap-3">
                <h1 className="font-bold text-white text-2xl md:text-3xl mb-1">RESUMEN</h1>
                <CardResume
                    resume={movieDetails}
                    selectedDay={selectedDay}
                    selectedShowtime={selectedShowtime}
                    tickets={tickets}
                    totalPrice={totalPrice}
                    selectedSeats={selectedSeats}
                />

                <button
                    disabled={selectedSeats.length === 0}
                    onClick={handleGoToCheckout}
                    className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-gray-900 disabled:to-gray-900 disabled:text-gray-600 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-lg shadow-red-900/30 transition-all cursor-pointer disabled:cursor-not-allowed text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-red-500/30 disabled:border-gray-800"
                >
                    <span>Continuar al Pago</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>

        </div>
    );
}

const rows = "ABCDEFGHIJKL".split("");
const aisleColumns = [5, 10, 13];

const DEFAULT_SEATS = rows.flatMap((row, rowIndex) => {
    let seatNumber = 1;

    return Array.from({ length: 16 }, (_, index) => {
        const positionX = index + 1;

        if (aisleColumns.includes(positionX)) {
            return null;
        }

        const seat = {
            id: `${row}${seatNumber}`,
            row,
            number: seatNumber,
            positionX,
            positionY: rowIndex + 1,
            type: "STANDARD",
            status: "available"
        };

        seatNumber++;

        return seat;
    }).filter(Boolean);
});

export default SeatSelection;