function InfoMovie({ movie }) {
    return (
        <div className="flex flex-col gap-2 mt-5">
            <h2 className="text-2xl font-bold mb-4">
                {movie.title}
            </h2>
            <p className="text-md text-gray-300">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum eveniet est repellat ea velit. Possimus ab similique officiis ratione error cumque soluta et,
                architecto facere obcaecati in maxime. Explicabo, quos.Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Illum eveniet est repellat ea velit. Possimus ab similique officiis ratione error cumque soluta et,
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum eveniet est repellat ea velit. Possimus ab similique officiis ratione error cumque soluta et,
                architecto facere obcaecati in maxime. Explicabo, quos.Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Illum eveniet est repellat ea velit. Possimus ab similique officiis ratione error cumque soluta et,
            </p>
        </div>
    )
}

export default InfoMovie