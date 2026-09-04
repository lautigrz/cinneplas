function AuthModalHeader({ tab, onClose }) {
  return (
    <>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800/60 transition-colors cursor-pointer"
        aria-label="Cerrar modal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </button>

      <div className="text-center mb-6">
        <span className="text-xs font-bold tracking-widest text-red-500 uppercase">Cineplas Experience</span>
        <h2 className="text-2xl font-extrabold mt-1">
          {tab === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {tab === "login"
            ? "Ingresa tus datos para acceder a tu cuenta"
            : "Regístrate para reservar tus funciones de cine"}
        </p>
      </div>
    </>
  );
}

export default AuthModalHeader;
