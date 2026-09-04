function AuthFormFields({
  tab,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
}) {
  return (
    <>
      {tab === "register" && (
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Nombre Completo
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Juan Pérez"
              className="w-full bg-gray-900/90 border border-gray-700/80 rounded-xl px-4 py-3 pl-11 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-sm"
              required
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="currentColor"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q64 0 128 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
            </svg>
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
          Correo Electrónico
        </label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full bg-gray-900/90 border border-gray-700/80 rounded-xl px-4 py-3 pl-11 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-sm"
            required
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="currentColor"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          >
            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200Z" />
          </svg>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
          Contraseña
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-gray-900/90 border border-gray-700/80 rounded-xl px-4 py-3 pl-11 pr-11 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-sm"
            required
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="currentColor"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          >
            <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM340-640h280v-80q0-58-41-99t-99-41q-58 0-99 41t-41 99v80Z" />
          </svg>

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                <path d="m644-428-58-58q9-47-27-83t-83-27l-58-58q17-8 36-12t38-4q100 0 170 70t70 170q0 19-4 38t-12 36Zm118 118-57-57q39-32 67.5-70.5T816-480q-34-72-96.5-124T576-670l-58-58q44-12 88-12 142 0 250 85.5T1000-480q-26 73-74.5 132T762-310ZM480-200q-142 0-250-85.5T80-480q26-73 74.5-132T286-704l122 122q-4 10-6 21t-2 21q0 83 58.5 141.5T600-341.5q10 0 21-2t21-6l66 66q-52 41-112 61.5T480-200Zm-78-234-82-82q-10 17-15 36t-5 38q0 75 52.5 127.5T480-462q19 0 38-5t36-15Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-142 0-250-85.5T80-500q44-119 152-204.5T480-790q142 0 250 85.5T940-500q-44 119-152 204.5T480-200Z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {tab === "login" && (
        <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
          <label className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-gray-700 bg-gray-900 text-red-600 focus:ring-red-500 cursor-pointer"
            />
            <span>Recordarme</span>
          </label>
          <a
            href="#forgot"
            onClick={(e) => {
              e.preventDefault();
              alert("Instrucciones enviadas a tu correo para restablecer tu contraseña.");
            }}
            className="text-red-400 hover:text-red-300 transition-colors font-medium"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      )}
    </>
  );
}

export default AuthFormFields;
