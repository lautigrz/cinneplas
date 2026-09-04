function CinemaStatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-(--color-card) p-5 rounded-2xl border border-gray-800 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28" fill="currentColor">
            <path d="M160-120v-480l320-240 320 240v480H160Zm80-80h480v-360L480-740 240-560v360Zm240-180Z" />
          </svg>
        </div>
        <div>
          <p className="text-xs uppercase font-medium text-gray-400">Total Cines</p>
          <h3 className="text-2xl font-bold text-white">{stats.totalCinemas}</h3>
        </div>
      </div>

      <div className="bg-(--color-card) p-5 rounded-2xl border border-gray-800 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28" fill="currentColor">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h400v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Z" />
          </svg>
        </div>
        <div>
          <p className="text-xs uppercase font-medium text-gray-400">Salas Habilitadas</p>
          <h3 className="text-2xl font-bold text-white">{stats.totalRooms}</h3>
        </div>
      </div>

      <div className="bg-(--color-card) p-5 rounded-2xl border border-gray-800 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28" fill="currentColor">
            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q64 0 128 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
          </svg>
        </div>
        <div>
          <p className="text-xs uppercase font-medium text-gray-400">Capacidad Total</p>
          <h3 className="text-2xl font-bold text-white">{stats.totalCapacity} <span className="text-sm text-gray-400 font-normal">butacas</span></h3>
        </div>
      </div>
    </div>
  );
}

export default CinemaStatsCards;
