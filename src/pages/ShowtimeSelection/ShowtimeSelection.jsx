
import { useParams } from "react-router-dom";
import movies from '../../data/Movies';
import MovieCard from "../../components/MovieCard/MovieCard";
import AvailableSeats from "./AvailableSeats";
import ShowdaySelector from "./ShowdaySelector";
import ShowtimeSelector from "./ShowtimeSelector";
import InfoMovie from "./InfoMovie";
function ShowtimeSelection() {
    const params = useParams();

    console.log("PARAMS:", params);
    const movie = movies.find((m) => m.id === parseInt(2));
    if (!movie) {
        return <div>Película no encontrada</div>;
    }
    return (
        <main className="bg-(--color-background) p-8 text-white">

            <section className="flex flex-col items-center justify-center lg:flex-row gap-20">

                <article className="w-80 shrink-0">
                    <MovieCard movie={movie} />
                </article>

                <div className="w-full min-w-0">
                    <ShowdaySelector idMovie={movie.id} />
                    <AvailableSeats idMovie={movie.id} />
                    <ShowtimeSelector idMovie={movie.id} />
                    <InfoMovie movie={movie} />
                </div>
            </section>

        </main>
    );

}
export default ShowtimeSelection;