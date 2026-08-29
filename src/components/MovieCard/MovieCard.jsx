import { Link } from "react-router";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
    return (
        <Link to={`/movie/${movie.id}`} className="h-full flex flex-col group">
            <div className="bg-(--color-card) cursor-pointer rounded-xl shadow-md hover:scale-[103%] transition-transform duration-300 h-full flex flex-col overflow-hidden border border-gray-800/80 hover:border-red-600/50">
                <div className="w-full aspect-2/3 overflow-hidden bg-gray-900">
                    <img
                        src={`${IMAGE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <div className="p-3 sm:p-4 flex-1 flex items-center justify-center min-h-18 bg-(--color-card)">
                    <p className="text-center text-white font-extrabold text-xs sm:text-sm tracking-wide line-clamp-2 leading-snug group-hover:text-red-500 transition-colors">
                        {movie.title}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;