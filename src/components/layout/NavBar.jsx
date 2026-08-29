import { useState } from "react";
import { Link } from "react-router";
import Button from "../ui/Button";

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="border-b border-gray-800 bg-(--color-background) p-4 sticky top-0 z-50 shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-1">

                {/* Logo */}
                <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
                    <h1 className="text-2xl font-black tracking-widest text-red-500 hover:text-red-400 transition-colors">
                        CINEPLAS
                    </h1>
                </Link>

                {/* Menú Desktop */}
                <ul className="hidden gap-8 md:flex items-center">
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
                </ul>

                {/* Acciones e Íconos (Desktop + Mobile) */}
                <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined cursor-pointer text-2xl text-gray-300 transition hover:text-red-500 hidden sm:inline-block">
                        search
                    </span>

                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="24px" 
                        viewBox="0 -960 960 960" 
                        width="24px" 
                        fill="currentColor" 
                        className="cursor-pointer text-2xl text-gray-300 transition hover:text-red-500 hidden sm:inline-block"
                    >
                        <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
                    </svg>

                    <div className="hidden sm:block">
                        <Button>Sign In</Button>
                    </div>

                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="24px" 
                        viewBox="0 -960 960 960" 
                        width="24px" 
                        fill="currentColor" 
                        className="cursor-pointer text-2xl text-gray-300 transition hover:text-red-500 hidden sm:inline-block"
                    >
                        <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z" />
                    </svg>

                    {/* Botón Hamburguesa / Cerrar (Mobile) */}
                    <button 
                        onClick={toggleMenu}
                        aria-label="Abrir menú"
                        className="text-white hover:text-red-500 focus:outline-none md:hidden p-1 rounded-lg transition-colors cursor-pointer"
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor">
                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor">
                                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Menú Desplegable Móvil */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-800 mt-3 pt-4 pb-4 px-4 flex flex-col gap-4 bg-(--color-card) rounded-xl animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl">
                    <ul className="flex flex-col gap-3">
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
                    </ul>

                    <div className="border-t border-gray-800 pt-3 flex items-center justify-between">
                        <Button>Sign In</Button>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined cursor-pointer text-2xl text-gray-300 hover:text-red-500">
                                search
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className="cursor-pointer text-2xl text-gray-300 hover:text-red-500">
                                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavBar;