import { useParams, Link, useLocation } from "react-router";
import { useState, useEffect } from "react";

import MovieCard from "../../components/MovieCard/MovieCard";
import AvailableSeats from "./AvailableSeats";
import ShowdaySelector from "./ShowdaySelector";
import ShowtimeSelector from "./ShowtimeSelector";
import InfoMovie from "./InfoMovie";

import { fetchMovieDetails } from "../../services/tmdb.js";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import BackButton from "../../components/ui/BackButton";

function ShowtimeSelection() {
    const { id } = useParams();
    const location = useLocation();

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

                <BackButton label="Volver a cartelera" />

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
                <div className="
                    fixed
                    bottom-0
                    left-0
                    z-50
                    w-full
                    border-t
                    border-gray-700
                    bg-gray-900
                    p-4
                    shadow-[0_-5px_20px_rgba(0,0,0,0.3)]
                ">
                    <div className="mx-auto flex max-w-6xl justify-end">

                        <Link to={`/tickets/${movieDetails.id}`}
                        state={{ selectedDay, selectedShowtime, tickets: savedTickets, selectedSeats: savedSeats }}
                        >
                            <button className="
                                rounded-lg
                                bg-red-600
                                px-6
                                py-3
                                font-semibold
                                text-white
                                hover:bg-red-700
                                transition-colors
                                cursor-pointer
                            ">
                                Continuar
                            </button>
                        </Link>

                    </div>
                </div>
            )}

        </main>
        </div>
    );
}

export default ShowtimeSelection;