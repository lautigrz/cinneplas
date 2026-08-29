import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";

import SeatMap from "./SeatMap";
import CardResume from "../../components/CardResume/CardResume";
import { fetchMovieDetails } from "../../services/tmdb.js";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import BackButton from "../../components/ui/BackButton";

function SeatSelection() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const { selectedDay, selectedShowtime, tickets, totalTickets, totalPrice, selectedSeats: initialSeats } = location.state || {};

    const [selectedSeats, setSelectedSeats] = useState(initialSeats || []);
    const [movieDetails, setMovieDetails] = useState(null);
    
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

    return (
        <div className="flex flex-col lg:flex-row min-h-screen items-start justify-start gap-6 bg-(--color-background) p-4 md:p-6 shadow-lg">

            <div className="flex-1 w-full min-w-0">
                <BackButton label="Volver a entradas" onClick={handleBackToTickets} />
                <h1 className="font-bold text-white text-2xl md:text-3xl mb-4">SELECCIONA TU BUTACA</h1>
                <div className="overflow-x-auto pb-2 custom-scrollbar">
                    <SeatMap
                        seats={seats}
                        selectedSeats={selectedSeats}
                        onSelectSeat={handleSelectSeat}
                    />
                </div>
            </div>

            <div className="w-full lg:w-80 shrink-0 mt-2 lg:mt-0">
                <h1 className="font-bold text-white text-2xl md:text-3xl mb-4">RESUMEN</h1>
                <CardResume 
                    resume={movieDetails} 
                    selectedDay={selectedDay} 
                    selectedShowtime={selectedShowtime}
                    tickets={tickets}
                    totalPrice={totalPrice}
                    selectedSeats={selectedSeats}
                />
            </div>

        </div>
    );
}



const rows = "ABCDEFGHIJKL".split("");
const aisleColumns = [5, 10, 13];

const seats = rows.flatMap((row, rowIndex) => {
    let seatNumber = 1;

    return Array.from({ length: 16 }, (_, index) => {
        const positionX = index + 1;

        // No existe una butaca en el pasillo
        if (aisleColumns.includes(positionX)) {
            return null;
        }

        const seat = {
            id: `${row}${seatNumber}`,
            row,
            number: seatNumber,
            positionX,
            positionY: rowIndex + 1,
            status: "available"
        };

        seatNumber++;

        return seat;
    }).filter(Boolean);
});


export default SeatSelection;