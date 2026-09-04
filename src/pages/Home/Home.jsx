import MovieCard from '../../components/MovieCard/MovieCard';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import { fetchMovies } from "../../services/tmdb.js";
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../context/useAuth';
import LoadingSpinner from '../../components/ui/LoadingSpinner';


function Home() {
  const { user, isLoading: authLoading } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchMovies();

        setMovies(data);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  if (authLoading) {
    console.log("authLoading");
    return <LoadingSpinner message="Cargando..." />;
  }

  if (user?.role === "ADMIN") {
    console.log(user);

    return <Navigate to="/admin" replace />;
  }

  if (loading) {
    return <LoadingSpinner message="Cargando películas..." />;
  }

  return (
    <>
      <HeroBanner movies={movies} />
      <section className="bg-(--color-background) p-8 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-2xl font-bold">
            EN CARTELERA
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}

          </div>
        </div>
      </section>
    </>
  );
}

export default Home;