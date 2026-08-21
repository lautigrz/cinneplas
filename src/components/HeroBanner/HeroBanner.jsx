function HeroBanner() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <img
        src="https://image.tmdb.org/t/p/original/5cY4DgCWhABURo3Kedt5hBwhzxF.jpg"
        alt="Spider-Man: Brand New Day"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex items-end justify-start">
  <div className="max-w-2xl px-8 pb-16 text-left md:px-16 md:pb-20">
    <h1 className="text-4xl font-bold text-white md:text-6xl">
      SPIDER-MAN: NO WAY HOME
    </h1>

    <div className="mt-4 flex items-center gap-3 text-sm text-gray-300">
      <span>2025</span>
      <span>•</span>
      <span>Acción</span>
      <span>•</span>
      <span>Aventura</span>
      <span>•</span>
      <span>2h 28min</span>
    </div>

    <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-200 md:text-lg">
      Peter Parker enfrenta las consecuencias de revelar su identidad,
      mientras una nueva amenaza pone en peligro todo lo que conoce.
    </p>

    <div className="mt-6 flex gap-4">
      <button className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-800">
        <span className="material-symbols-outlined">
          
        </span>
        Ver ahora
      </button>

      <button className="flex items-center gap-2 rounded-lg bg-gray-500/60 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-gray-500">
        <span className="material-symbols-outlined">
          
        </span>
        Mi lista
      </button>
    </div>
  </div>
</div>
    </section>
  );
}

export default HeroBanner;