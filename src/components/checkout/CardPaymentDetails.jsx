function CardPaymentDetails({ cardData, onChange }) {
  return (
    <div className="bg-(--color-card) border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-lg">💳</span>
          <h3 className="text-base font-bold text-white">Datos de la Tarjeta</h3>
        </div>
        <div className="flex gap-2 text-xs text-gray-400">
          <span className="px-2 py-0.5 bg-gray-900 rounded border border-gray-800">VISA</span>
          <span className="px-2 py-0.5 bg-gray-900 rounded border border-gray-800">MC</span>
          <span className="px-2 py-0.5 bg-gray-900 rounded border border-gray-800">AMEX</span>
        </div>
      </div>

      {/* Tarjeta Visual Mockup */}
      <div className="w-full h-44 bg-liner-to-br from-red-950 via-gray-900 to-black border border-red-900/40 rounded-2xl p-5 shadow-2xl flex flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold tracking-widest text-red-500 uppercase">CINEPLAS PASS</span>
          <span className="text-xs text-gray-400 font-mono">CREDIT / DEBIT</span>
        </div>

        <div className="font-mono text-lg tracking-widest text-gray-200">
          {cardData.cardNumber || "•••• •••• •••• ••••"}
        </div>

        <div className="flex justify-between items-end text-xs font-mono">
          <div>
            <span className="text-[10px] text-gray-500 block">TITULAR</span>
            <span className="font-bold text-gray-300 uppercase">
              {cardData.cardName || "NOMBRE Y APELLIDO"}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block">VENCE</span>
            <span className="font-bold text-gray-300">
              {cardData.cardExpiry || "MM/AA"}
            </span>
          </div>
        </div>
      </div>

      {/* Formulario Tarjeta */}
      <div className="space-y-4 pt-2">
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Número de Tarjeta *
          </label>
          <input
            type="text"
            name="cardNumber"
            maxLength={19}
            value={cardData.cardNumber}
            onChange={onChange}
            placeholder="4500 1234 5678 9010"
            required
            className="w-full bg-gray-900/90 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Nombre como figura en la tarjeta *
          </label>
          <input
            type="text"
            name="cardName"
            value={cardData.cardName}
            onChange={onChange}
            placeholder="JUAN PEREZ"
            required
            className="w-full bg-gray-900/90 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-sm uppercase"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Vencimiento (MM/AA) *
            </label>
            <input
              type="text"
              name="cardExpiry"
              maxLength={5}
              value={cardData.cardExpiry}
              onChange={onChange}
              placeholder="12/28"
              required
              className="w-full bg-gray-900/90 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Código CVC / CVV *
            </label>
            <input
              type="password"
              name="cardCvc"
              maxLength={4}
              value={cardData.cardCvc}
              onChange={onChange}
              placeholder="•••"
              required
              className="w-full bg-gray-900/90 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-sm font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPaymentDetails;
