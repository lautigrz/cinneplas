import { Link } from "react-router"

function MovieCard({ movie }) {
    console.log(movie);
    return (
        <Link to={`/movie/${movie.id}`}>
    <div className="bg-(--color-card) cursor-pointer rounded-lg shadow-md hover:scale-105 transition duration-300">
        <img src={movie.poster} alt={movie.title} className="w-full h-auto rounded-md"></img>
        <p className="mt-2 text-center text-white font-semibold p-4">{movie.title}</p>
    </div>
        </Link>
    )
}
export default MovieCard