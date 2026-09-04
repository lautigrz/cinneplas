import { useState } from "react";
import { Link } from "react-router";
import Button from "../ui/Button";
import { useAuth } from "../../context/useAuth";

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated, openLoginModal, logout } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="border-b border-gray-800 bg-(--color-background) p-4 sticky top-0 z-50 shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-1">


                <Link to={user?.role === "ADMIN" ? "/admin" : "/"} onClick={closeMenu} className="flex items-center gap-2">
                    <h1 className="text-2xl font-black tracking-widest text-red-500 hover:text-red-400 transition-colors">
                        CINEPLAS
                    </h1>
                </Link>


                <ul className="hidden gap-6 md:flex items-center">
                    {user?.role === "ADMIN" ? (
                        <>
                            <li>
                                <Link
                                    to="/admin"
                                    className="text-white font-semibold transition hover:text-red-400 flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-red-500 px-3.5 py-1.5 rounded-lg shadow-md text-sm"
                                >
                                    <span>⚙️ Dashboard Operaciones</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/cinemas"
                                    className="text-red-400 font-medium transition hover:text-red-300 flex items-center gap-1.5 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 text-sm"
                                >
                                    <span>🏢 Gestión Cines</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/create-room"
                                    className="text-amber-400 font-medium transition hover:text-amber-300 flex items-center gap-1.5 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 text-sm"
                                >
                                    <span>🛠️ Creador de Salas</span>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to="/"
                                    className="text-gray-300 font-medium transition hover:text-red-500"
                                >
                                    Cartelera
                                </Link>
                            </li>
                            <li>
                                <a
                                    className="text-gray-300 font-medium transition hover:text-red-500"
                                    href="#estrenos"
                                >
                                    Próximos Estrenos
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-gray-300 font-medium transition hover:text-red-500"
                                    href="#candy-bar"
                                >
                                    Candy Bar
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-gray-300 font-medium transition hover:text-red-500"
                                    href="#promociones"
                                >
                                    Promociones
                                </a>
                            </li>
                        </>
                    )}
                </ul>

                <div className="flex items-center gap-4">
                    {user?.role !== "ADMIN" && (
                        <span className="material-symbols-outlined cursor-pointer text-2xl text-gray-300 transition hover:text-red-500 hidden sm:inline-block">
                            search
                        </span>
                    )}

                    {isAuthenticated ? (
                        <div className="hidden sm:flex items-center gap-3 bg-gray-900/80 border border-gray-800 py-1 px-3 rounded-xl">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-red-500 text-white font-bold text-sm flex items-center justify-center shadow-md">
                                {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || "A"}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-200 max-w-30 truncate">
                                    {user?.name || user?.email?.split("@")[0]}
                                </span>
                                {user?.role === "ADMIN" && (
                                    <span className="text-[10px] text-red-400 font-semibold uppercase tracking-wider">Administrador</span>
                                )}
                            </div>
                            <button
                                onClick={logout}
                                className="text-xs text-gray-400 hover:text-red-400 transition-colors ml-1 cursor-pointer font-medium"
                                title="Cerrar sesión"
                            >
                                Salir
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="hidden sm:block">
                                <Button onClick={openLoginModal}>Sign In</Button>
                            </div>
                        </>
                    )}


                    <button
                        onClick={toggleMenu}
                        aria-label="Abrir menú"
                        className="text-white hover:text-red-500 focus:outline-none md:hidden p-1 rounded-lg transition-colors cursor-pointer"
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor">
                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor">
                                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-800 mt-3 pt-4 pb-4 px-4 flex flex-col gap-4 bg-(--color-card) rounded-xl animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl">
                    <ul className="flex flex-col gap-3">
                        {user?.role === "ADMIN" ? (
                            <>
                                <li>
                                    <Link
                                        to="/admin"
                                        onClick={closeMenu}
                                        className="block text-white font-semibold py-2 px-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition-colors"
                                    >
                                        ⚙️ Dashboard Operaciones (Admin)
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/cinemas"
                                        onClick={closeMenu}
                                        className="block text-red-400 font-medium py-2 px-3 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                                    >
                                        🏢 Gestión Cines (Admin)
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/create-room"
                                        onClick={closeMenu}
                                        className="block text-amber-400 font-medium py-2 px-3 rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                                    >
                                        🛠️ Creador de Salas (Admin)
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/"
                                        onClick={closeMenu}
                                        className="block text-gray-200 font-medium py-2 px-3 rounded-lg hover:bg-gray-800 hover:text-red-500 transition-colors"
                                    >
                                        Cartelera
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="#estrenos"
                                        onClick={closeMenu}
                                        className="block text-gray-200 font-medium py-2 px-3 rounded-lg hover:bg-gray-800 hover:text-red-500 transition-colors"
                                    >
                                        Próximos Estrenos
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#candy-bar"
                                        onClick={closeMenu}
                                        className="block text-gray-200 font-medium py-2 px-3 rounded-lg hover:bg-gray-800 hover:text-red-500 transition-colors"
                                    >
                                        Candy Bar
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#promociones"
                                        onClick={closeMenu}
                                        className="block text-gray-200 font-medium py-2 px-3 rounded-lg hover:bg-gray-800 hover:text-red-500 transition-colors"
                                    >
                                        Promociones
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>

                    <div className="border-t border-gray-800 pt-3 flex items-center justify-between">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-liner-to-tr from-red-600 to-red-500 text-white font-bold text-sm flex items-center justify-center shadow-md">
                                    {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || "U"}
                                </div>
                                <span className="text-sm font-medium text-gray-200">
                                    {user?.name || user?.email?.split("@")[0]}
                                </span>
                                <button
                                    onClick={() => {
                                        logout();
                                        closeMenu();
                                    }}
                                    className="text-xs text-red-400 hover:text-red-300 font-medium ml-2"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        ) : (
                            <Button onClick={() => { openLoginModal(); closeMenu(); }}>Sign In</Button>
                        )}

                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined cursor-pointer text-2xl text-gray-300 hover:text-red-500">
                                search
                            </span>
                            {!isAuthenticated && (
                                <svg
                                    onClick={() => { openLoginModal(); closeMenu(); }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="currentColor"
                                    className="cursor-pointer text-2xl text-gray-300 hover:text-red-500"
                                >
                                    <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z" />
                                </svg>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavBar;