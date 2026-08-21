import Button from "../ui/Button"

function NavBar() {

    return (
        <nav className="border-b border-gray-800 bg-(--color-background) p-4">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-3">

                {/* Logo */}
                <h1 className="text-2xl font-bold tracking-widest text-red-500">
                    CINEPLAS
                </h1>

                <ul className="hidden gap-6 md:flex">
                    <li>
                        <a
                            className="text-white transition hover:text-red-500"
                            href="/peliculas"
                        >
                            Movies
                        </a>
                    </li>

                    <li>
                        <a
                            className="text-white transition hover:text-red-500"
                            href="/series"
                        >
                            Series
                        </a>
                    </li>

                    <li>
                        <a
                            className="text-white transition hover:text-red-500"
                            href="/mi-lista"
                        >
                            My List
                        </a>
                    </li>
                </ul>

                <div className="flex items-center gap-4">

                    <span className="material-symbols-outlined cursor-pointer text-2xl text-white transition hover:text-red-500">
                        search
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className="cursor-pointer text-2xl text-white transition hover:text-red-500"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" /></svg>



                    <Button>Sign In</Button>

                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className="cursor-pointer text-2xl text-white transition hover:text-red-500"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z" /></svg>

                    <button className="text-white md:hidden">
                        <span className="material-symbols-outlined text-2xl">
                            menu
                        </span>
                    </button>

                </div>

            </div>
        </nav>
    )

}

export default NavBar