const BASE_URL = "https://api.themoviedb.org/3";

const options = {
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
    },
};


export async function fetchMovies() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?language=es-ES`, options);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}

export async function fetchMovieDetails(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?language=es-ES`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
}