import { useState, useEffect } from "react";
import { Link } from "react-router";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

function HeroBanner({ movies = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const featuredMovies = movies.filter(m => m.backdrop_path).slice(0, 6);

    useEffect(() => {
        featuredMovies.forEach((movie) => {
            if (movie.backdrop_path) {
                const img = new Image();
                img.src = `${BACKDROP_BASE_URL}${movie.backdrop_path}`;
            }
        });
    }, [featuredMovies]);

    useEffect(() => {
        if (featuredMovies.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredMovies.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [featuredMovies.length]);

    if (featuredMovies.length === 0) {
        return null;
    }

    const currentMovie = featuredMovies[currentIndex];

    return (
        <section className="relative h-[70vh] sm:h-[80vh] w-full overflow-hidden bg-black group">

            {featuredMovies.map((movie, index) => (
                <div
                    key={movie.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                >
                    <img
                        src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`}
                        alt={movie.title}
                        className="h-full w-full object-cover object-top opacity-75 transform scale-105"
                    />


                    <div className="absolute inset-0 bg-linear-to-t from-(--color-background) via-(--color-background)/60 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-r from-(--color-background) via-(--color-background)/50 to-transparent" />
                </div>
            ))}
            <div
                key={`content-${currentMovie.id}`}
                className="absolute inset-0 z-20 flex items-end justify-start p-6 pb-16 md:p-16 md:pb-20 animate-in slide-in-from-bottom-6 fade-in duration-700"
            >
                <div className="max-w-2xl text-left">
                    <span className="inline-block px-3 py-1 bg-red-600/90 text-white text-xs font-extrabold uppercase tracking-widest rounded-md mb-3 shadow-md">
                        Popular en Cartelera
                    </span>

                    <h1 className="text-2xl sm:text-5xl font-black text-white leading-tight uppercase drop-shadow-md">
                        {currentMovie.title}
                    </h1>

                    <div className="mt-3 flex items-center gap-3 text-xs sm:text-sm text-gray-300 font-semibold">
                        <span className="flex items-center gap-1 text-amber-400 font-bold">
                            ⭐ {currentMovie.vote_average?.toFixed(1)}
                        </span>
                        <span>•</span>
                        <span>{currentMovie.release_date?.split("-")[0] || "2026"}</span>
                        <span>•</span>
                        <span className="uppercase text-gray-400">TMDB Popular</span>
                    </div>

                    <p className="mt-4 max-w-xl text-xs sm:text-sm leading-relaxed text-gray-300 line-clamp-3 sm:line-clamp-4 drop-shadow">
                        {currentMovie.overview || "Disfruta de esta increíble película en nuestras salas equipadas con sonido envolvente y proyección 4K."}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-4 items-center">
                        <Link
                            to={`/movie/${currentMovie.id}`}
                            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-extrabold text-white transition hover:bg-red-700 shadow-lg shadow-red-900/30 hover:scale-105 transform cursor-pointer text-sm sm:text-base"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                                <path d="M180-120q-25 0-42.5-17.5T120-180v-600q0-25 17.5-42.5T180-840h600q25 0 42.5 17.5T840-780v600q0 25-17.5 42.5T780-120H180Zm0-60h600v-600H180v600Zm180-120 240-160-240-160v320Z" />
                            </svg>
                            Ver Horarios / Entradas
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2 max-w-[90vw] px-4 overflow-x-auto scrollbar-hide bg-black/40 backdrop-blur-md py-2 rounded-full border border-white/10 shadow-lg">
                {featuredMovies.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all shrink-0 cursor-pointer ${currentIndex === index
                            ? "w-6 bg-red-600"
                            : "w-2 bg-white/40 hover:bg-white/70"
                            }`}
                        aria-label={`Ir a la película ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

export default HeroBanner;