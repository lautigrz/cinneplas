function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
    >
      {children}
    </button>
  );
}

export default Button;