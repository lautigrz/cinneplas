function AuthAlert({ type, message }) {
  if (!message) return null;

  const isError = type === "error";

  return (
    <div
      className={`mb-4 p-3 border text-sm rounded-xl flex items-center gap-2 animate-in fade-in ${
        isError
          ? "bg-red-950/80 border-red-800/80 text-red-200"
          : "bg-emerald-950/80 border-emerald-800/80 text-emerald-200"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="20px"
        fill="currentColor"
        className="shrink-0"
      >
        {isError ? (
          <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
        ) : (
          <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        )}
      </svg>
      <span>{message}</span>
    </div>
  );
}

export default AuthAlert;
