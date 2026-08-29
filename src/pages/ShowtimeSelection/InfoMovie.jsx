function InfoMovie({ movie }) {
    return (
        <div className="flex flex-col gap-2 mt-5">
            <h2 className="text-2xl font-bold mb-4">
                {movie.title}
            </h2>
            <p className="text-md text-gray-300">
                {movie.overview}
            </p>
        </div>
    )
}

export default InfoMovie