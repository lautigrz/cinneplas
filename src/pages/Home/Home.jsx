import MovieCard from '../../components/MovieCard/MovieCard';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import movies from '../../data/Movies';

function Home() {
  return (
    <>
      <HeroBanner />
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