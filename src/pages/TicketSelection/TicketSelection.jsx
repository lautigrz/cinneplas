import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import CardResume from "../../components/CardResume/CardResume";
import { fetchMovieDetails } from "../../services/tmdb";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import BackButton from "../../components/ui/BackButton";

function TicketSelection() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const { selectedDay, selectedShowtime, tickets: savedTickets, selectedSeats: savedSeats } = location.state || {};
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    // Estado para la cantidad de entradas y cálculo dinámico de precios (retiene estado previo si existe)
    const [tickets, setTickets] = useState(savedTickets || {
        adult: {
            id: "adult",
            name: "Adulto",
            price: 18.00,
            description: "Entrada general para adultos",
            quantity: 0
        },
        child: {
            id: "child",
            name: "Niño",
            price: 12.00,
            description: "Menores de 12 años",
            quantity: 0
        },
        senior: {
            id: "senior",
            name: "Senior",
            price: 14.00,
            description: "Mayores de 60 años",
            quantity: 0
        }
    });

    useEffect(() => {
        async function loadMovieDetails() {
            try {
                const details = await fetchMovieDetails(id);
                setMovieDetails(details);
            } catch (error) {
                console.error("Error al cargar los detalles de la película:", error);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            loadMovieDetails();
        }
    }, [id]);

    const handleQuantityChange = (ticketId, delta) => {
        setTickets((prev) => {
            const currentQty = prev[ticketId].quantity;
            const newQty = Math.max(0, currentQty + delta);
            return {
                ...prev,
                [ticketId]: {
                    ...prev[ticketId],
                    quantity: newQty
                }
            };
        });
    };

    // Totales calculados dinámicamente desde el estado
    const totalTickets = Object.values(tickets).reduce((acc, t) => acc + t.quantity, 0);
    const totalPrice = Object.values(tickets).reduce((acc, t) => acc + (t.quantity * t.price), 0);

    const handleBackToMovie = () => {
        navigate(`/movie/${id}`, {
            state: {
                selectedDay,
                selectedShowtime,
                tickets,
                selectedSeats: savedSeats
            }
        });
    };

    const handleContinue = () => {
        if (totalTickets === 0) return;
        navigate(`/booking/${id}`, {
            state: {
                selectedDay,
                selectedShowtime,
                tickets,
                totalTickets,
                totalPrice,
                selectedSeats: savedSeats
            }
        });
    };

    if (loading || !movieDetails) {
        return <LoadingSpinner message="Cargando selección de entradas..." />;
    }

    return (
        <div className="min-h-screen bg-(--color-background) p-6 md:p-10 text-white">
            <div className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-8 items-start">

                {/* Sección Principal: Selección de Entradas y Promociones */}
                <div className="flex-1 w-full min-w-0">

                    <BackButton label="Volver a horarios" onClick={handleBackToMovie} />

                    {/* Encabezado */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 uppercase">
                            SELECCIONA TUS ENTRADAS
                        </h1>
                        <p className="text-gray-400">
                            Paso 2 de 4 — Elige el tipo y la cantidad de entradas para {movieDetails.title}.
                        </p>
                    </div>

                    {/* Lista de Entradas */}
                    <div className="flex flex-col gap-4 mb-10">
                        {Object.values(tickets).map((ticket) => (
                            <div
                                key={ticket.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-(--color-card) border border-gray-800 hover:border-gray-700 transition-colors shadow-md gap-4"
                            >
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-xl font-bold text-white">{ticket.name}</h3>
                                        <span className="text-lg font-extrabold text-red-500">
                                            ${ticket.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1">{ticket.description}</p>
                                </div>

                                {/* Contadores Dinámicos */}
                                <div className="flex items-center gap-4 bg-gray-900/80 px-4 py-2 rounded-xl border border-gray-700 self-start sm:self-auto">
                                    <button
                                        onClick={() => handleQuantityChange(ticket.id, -1)}
                                        disabled={ticket.quantity === 0}
                                        className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-gray-800 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                                        aria-label={`Disminuir ${ticket.name}`}
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center text-lg font-bold text-white">
                                        {ticket.quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(ticket.id, 1)}
                                        className="w-8 h-8 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                                        aria-label={`Aumentar ${ticket.name}`}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Promociones y Descuentos */}
                    <div className="mt-8 pt-8 border-t border-gray-800">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-2xl">🏷️</span>
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
                                Promociones y Descuentos
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-linear-to-br from-gray-900 to-(--color-card) border border-gray-800 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2.5 py-1 text-xs font-bold bg-amber-500/20 text-amber-400 rounded-md border border-amber-500/30">Exclusivo</span>
                                        <h4 className="font-bold text-lg text-white">2x1 Tarjetas Black</h4>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        Aplica en entradas de adulto pagando con tarjetas de crédito Black seleccionadas.
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 rounded-2xl bg-linear-to-br from-gray-900 to-(--color-card) border border-gray-800 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2.5 py-1 text-xs font-bold bg-blue-500/20 text-blue-400 rounded-md border border-blue-500/30">Beneficio</span>
                                        <h4 className="font-bold text-lg text-white">Combo Estudiante</h4>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        Muestra tu credencial en dulcería y obtén un 20% de descuento en combos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lateral: Resumen */}
                <div className="w-full lg:w-80 shrink-0 sticky top-6">
                    <h2 className="font-bold text-white text-2xl mb-4 uppercase tracking-wide">RESUMEN</h2>
                    <CardResume
                        resume={movieDetails}
                        selectedDay={selectedDay}
                        selectedShowtime={selectedShowtime}
                        tickets={tickets}
                        totalPrice={totalPrice}
                    />

                    {/* Botón de Acción */}
                    <button
                        onClick={handleContinue}
                        disabled={totalTickets === 0}
                        className="w-full mt-4 py-3.5 px-6 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:hover:bg-red-600 transition-colors shadow-lg cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {totalTickets === 0 ? "Selecciona tus entradas" : `Continuar (${totalTickets} ${totalTickets === 1 ? 'entrada' : 'entradas'})`}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TicketSelection;
