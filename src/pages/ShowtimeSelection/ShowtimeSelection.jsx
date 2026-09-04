import { useParams, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import MovieCard from "../../components/MovieCard/MovieCard";
import AvailableSeats from "./AvailableSeats";
import ShowdaySelector from "./ShowdaySelector";
import ShowtimeSelector from "./ShowtimeSelector";
import InfoMovie from "./InfoMovie";
import { fetchMovieDetails } from "../../services/tmdb.js";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import BackButton from "../../components/ui/BackButton";
import { useNavigate } from "react-router";

function ShowtimeSelection() {
    const { id } = useParams();
    const location = useLocation();
    const { isAuthenticated, openLoginModal } = useAuth();
    const navigate = useNavigate();
    const handleMovieClick = () => {
        if (!isAuthenticated) {
            openLoginModal();
            return;
        }

        navigate(`/tickets/${movieDetails.id}`, {
            state: {
                selectedDay, selectedShowtime, tickets: savedTickets, selectedSeats: savedSeats
            }
        })
    }

    const { selectedDay: initialDay, selectedShowtime: initialShowtime, tickets: savedTickets, selectedSeats: savedSeats } = location.state || {};

    const [selectedDay, setSelectedDay] = useState(initialDay || null);
    const [selectedShowtime, setSelectedShowtime] = useState(initialShowtime || null);
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
        return <LoadingSpinner message="Cargando información de la película..." />;
    }

    return (
        <div className="w-full bg-(--color-background) min-h-screen text-white">
            <main className="p-6 md:p-8 max-w-6xl mx-auto">

                <BackButton label="Volver a cartelera" to="/" />

                <section className="flex flex-col items-center justify-center lg:flex-row gap-12 lg:gap-20 pb-24">

                    <article className="w-80 shrink-0">
                        <MovieCard movie={movieDetails} />
                    </article>

                    <div className="w-full min-w-0">

                        <ShowdaySelector
                            idMovie={movieDetails.id}
                            selectedDay={selectedDay}
                            setSelectedDay={setSelectedDay}
                        />

                        <AvailableSeats
                            idMovie={movieDetails.id}
                        />

                        <ShowtimeSelector
                            idMovie={movieDetails.id}
                            selectedShowtime={selectedShowtime}
                            setSelectedShowtime={setSelectedShowtime}
                        />

                        <InfoMovie movie={movieDetails} />

                    </div>

                </section>

                {selectedDay && selectedShowtime && (
                    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-800 bg-(--color-card)/95 backdrop-blur-md px-6 py-4 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-full duration-300">
                        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm">
                                <span className="text-gray-400 font-medium">Función seleccionada:</span>
                                <div className="flex items-center gap-2">
                                    <span className="bg-amber-500/20 text-amber-400 font-extrabold px-2.5 py-1 rounded-md border border-amber-500/30">
                                        {selectedDay.day} {selectedDay.date || ""}
                                    </span>
                                    <span className="bg-red-500/20 text-red-400 font-extrabold px-2.5 py-1 rounded-md border border-red-500/30">
                                        {selectedShowtime.time} hs
                                    </span>
                                </div>
                            </div>
                            <button onClick={handleMovieClick} className="rounded-xl bg-red-600 px-6 sm:px-8 py-3 font-extrabold text-white hover:bg-red-500 shadow-lg shadow-red-900/40 hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all transform flex items-center gap-2 cursor-pointer text-sm sm:text-base">
                                <span>Continuar</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="20px"
                                    viewBox="0 -960 960 960"
                                    width="20px"
                                    fill="currentColor"
                                    className="transition-transform group-hover:translate-x-1"
                                >
                                    <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
                                </svg>
                            </button>

                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

export default ShowtimeSelection;