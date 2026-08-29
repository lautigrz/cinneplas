function LoadingSpinner({ message = "Cargando..." }) {
    return (
        <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-4 text-white p-6 bg-(--color-background)">
            <div className="relative flex items-center justify-center">
                {/* Anillo de resplandor sutil */}
                <div className="absolute w-14 h-14 rounded-full bg-red-600/20 blur-md animate-pulse"></div>
                
                {/* Círculo giratorio */}
                <div className="w-12 h-12 border-4 border-gray-800 border-t-red-600 border-r-red-500 rounded-full animate-spin"></div>
            </div>

            {message && (
                <p className="text-gray-300 font-medium text-sm sm:text-base animate-pulse tracking-wide">
                    {message}
                </p>
            )}
        </div>
    );
}

export default LoadingSpinner;
