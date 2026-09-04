function AuthTabSelector({ activeTab, onSelectTab, onTabChange }) {
  const handleTabChange = (tab) => {
    onTabChange();
    onSelectTab(tab);
  };
  return (
    <div className="flex bg-gray-900/90 p-1 rounded-xl mb-6 border border-gray-800">
      <button
        type="button"
        onClick={() => handleTabChange("login")}
        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${activeTab === "login"
          ? "bg-red-600 text-white shadow-md"
          : "text-gray-400 hover:text-white"
          }`}
      >
        Iniciar Sesión
      </button>
      <button
        type="button"
        onClick={() => handleTabChange("register")}
        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${activeTab === "register"
          ? "bg-red-600 text-white shadow-md"
          : "text-gray-400 hover:text-white"
          }`}
      >
        Registrarse
      </button>
    </div>
  );
}

export default AuthTabSelector;
