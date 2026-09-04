import { useState, useEffect } from "react";
import cinemaService from "../../services/cinemaService";
import { fetchMovies } from "../../services/tmdb";
import { DashboardHeader } from "../../components/admin/DashboardHeader";
import { DashboardMetrics } from "../../components/admin/DashboardMetrics";
import { QuickAccessCards } from "../../components/admin/QuickAccessCards";
import { ShowtimesTable } from "../../components/admin/ShowtimesTable";
import { AddMovieModal } from "../../components/admin/AddMovieModal";
import { AddShowtimeModal } from "../../components/admin/AddShowtimeModal";

function AdminDashboard() {
  const [cinemas] = useState(() => cinemaService.getAllCinemas());
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState(() => {
    const saved = localStorage.getItem("cineplas_showtimes");
    return saved
      ? JSON.parse(saved)
      : [
        { id: 1, movieTitle: "Batman", cinemaName: "Cineplas Abasto", roomName: "Sala 1 3D", time: "18:30", date: "2026-09-02", price: 4500 },
        { id: 2, movieTitle: "Avatar 2", cinemaName: "Cineplas Premium Palermo", roomName: "Sala IMAX", time: "21:00", date: "2026-09-02", price: 6000 },
      ];
  });

  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [isShowtimeModalOpen, setIsShowtimeModalOpen] = useState(false);

  useEffect(() => {
    fetchMovies().then(setMovies).catch(console.error);
  }, []);

  const saveShowtimes = (list) => {
    setShowtimes(list);
    localStorage.setItem("cineplas_showtimes", JSON.stringify(list));
  };

  const handleAddMovie = (newMovie) => {
    const added = { id: Date.now(), ...newMovie };
    setMovies([added, ...movies]);
  };

  const handleAddShowtime = (showtimeData) => {
    const created = {
      id: Date.now(),
      ...showtimeData,
    };
    saveShowtimes([created, ...showtimes]);
  };

  const handleDeleteShowtime = (id) => {
    saveShowtimes(showtimes.filter((s) => s.id !== id));
  };

  const totalCapacity = 0
  const totalRooms = 0

  return (
    <div className="min-h-screen bg-(--color-background) text-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader
          onOpenMovieModal={() => setIsMovieModalOpen(true)}
          onOpenShowtimeModal={() => setIsShowtimeModalOpen(true)}
        />

        <DashboardMetrics
          cinemasCount={cinemas.length}
          totalRooms={totalRooms}
          totalCapacity={totalCapacity}
          showtimesCount={showtimes.length}
        />

        <QuickAccessCards />

        <ShowtimesTable
          showtimes={showtimes}
          onDeleteShowtime={handleDeleteShowtime}
          onOpenShowtimeModal={() => setIsShowtimeModalOpen(true)}
        />

        <AddMovieModal
          isOpen={isMovieModalOpen}
          onClose={() => setIsMovieModalOpen(false)}
          onAddMovie={handleAddMovie}
        />

        <AddShowtimeModal
          isOpen={isShowtimeModalOpen}
          onClose={() => setIsShowtimeModalOpen(false)}
          movies={movies}
          cinemas={cinemas}
          onAddShowtime={handleAddShowtime}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
