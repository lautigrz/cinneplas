import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import OrderSummaryCard from "../../components/checkout/OrderSummaryCard";
import PaymentMethodSelector from "../../components/checkout/PaymentMethodSelector";
import BuyerInfoForm from "../../components/checkout/BuyerInfoForm";
import CardPaymentDetails from "../../components/checkout/CardPaymentDetails";
import MercadoPagoView from "../../components/checkout/MercadoPagoView";
import DigitalTicketModal from "../../components/checkout/DigitalTicketModal";
import BackButton from "../../components/ui/BackButton";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    selectedDay,
    selectedShowtime,
    tickets,
    totalPrice = 0,
    selectedSeats = [],
    movieDetails,
    roomInfo,
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  const [buyerData, setBuyerData] = useState({
    fullName: "",
    dni: "",
    email: "",
    phone: "",
  });

  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const handleBuyerChange = (e) => {
    const { name, value } = e.target;
    setBuyerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedCode = `CP-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingCode(generatedCode);
      setIsProcessing(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const handleBack = () => {
    navigate(`/booking/${id}`, {
      state: location.state,
    });
  };

  const serviceFee = totalPrice * 0.1;
  const finalTotal = totalPrice + serviceFee;

  return (
    <div className="min-h-screen bg-(--color-background) p-4 md:p-8 text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        <BackButton label="Volver a la selección de butacas" onClick={handleBack} />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
              Finalizar Reserva y Pago
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Selecciona tu medio de pago preferido para confirmar tus entradas
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Pago Seguro Encriptado SSL</span>
          </div>
        </div>

        <form onSubmit={handleProcessPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <BuyerInfoForm formData={buyerData} onChange={handleBuyerChange} />

            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onSelectMethod={setPaymentMethod}
            />

            {paymentMethod === "card" && (
              <CardPaymentDetails cardData={cardData} onChange={handleCardChange} />
            )}

            {paymentMethod === "mercadopago" && (
              <MercadoPagoView amount={finalTotal} />
            )}

            {paymentMethod === "transfer" && (
              <div className="bg-(--color-card) border border-gray-800 rounded-3xl p-6 shadow-xl space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-emerald-400">🏦</span> Datos para Transferencia Bancaria
                </h3>
                <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 text-xs space-y-1.5 font-mono text-gray-300">
                  <p>Banco: <strong className="text-white">Banco Santander</strong></p>
                  <p>CBU: <strong className="text-white">0720123488000012345678</strong></p>
                  <p>Alias: <strong className="text-emerald-400 font-bold">CINEPLAS.ENTRADAS</strong></p>
                  <p>Cuit: <strong className="text-white">30-71234567-8</strong></p>
                </div>
              </div>
            )}

            {paymentMethod === "cash" && (
              <div className="bg-(--color-card) border border-amber-900/40 rounded-3xl p-6 shadow-xl space-y-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">🎟️</span> Reserva en Efectivo
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Podrás abonar en efectivo directo en la boletería del cine hasta 20 minutos antes del inicio de la función presentando tu código de reserva.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold py-4 px-6 rounded-2xl shadow-xl shadow-red-900/30 transition-all text-base cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Procesando pago seguro...</span>
                </>
              ) : (
                <span>Confirmar y Pagar ${finalTotal.toFixed(2)}</span>
              )}
            </button>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <OrderSummaryCard
                movie={movieDetails}
                selectedDay={selectedDay}
                selectedShowtime={selectedShowtime}
                tickets={tickets}
                totalPrice={totalPrice}
                selectedSeats={selectedSeats}
                roomName={roomInfo?.name}
              />
            </div>
          </div>
        </form>

        {showSuccessModal && (
          <DigitalTicketModal
            bookingCode={bookingCode}
            movie={movieDetails}
            selectedDay={selectedDay}
            selectedShowtime={selectedShowtime}
            selectedSeats={selectedSeats}
            roomName={roomInfo?.name}
            totalPrice={finalTotal}
            buyerName={buyerData.fullName}
            buyerEmail={buyerData.email}
            onClose={() => navigate("/")}
          />
        )}
      </div>
    </div>
  );
}

export default Checkout;
