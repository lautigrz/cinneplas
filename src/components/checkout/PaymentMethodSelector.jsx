const PAYMENT_METHODS = [
  {
    id: "card",
    title: "Tarjeta de Crédito / Débito",
    subtitle: "Visa, Mastercard, Amex, Cabal",
    badge: "Instantáneo",
    icon: (
      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
        <path d="M2 10h20" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "mercadopago",
    title: "Mercado Pago",
    subtitle: "Escanea con QR o usa saldo en cuenta",
    badge: "Popular",
    icon: (
      <span className="text-xl font-black text-sky-400">MP</span>
    ),
  },
  {
    id: "transfer",
    title: "Transferencia Bancaria",
    subtitle: "Acreditación directa vía CBU / Alias",
    badge: "Sin comisiones",
    icon: (
      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    id: "cash",
    title: "Reserva para Boletería",
    subtitle: "Paga en efectivo al retirar en el cine",
    badge: "En boletería",
    icon: (
      <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

function PaymentMethodSelector({ selectedMethod, onSelectMethod }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
        Selecciona tu Medio de Pago
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative ${
                isSelected
                  ? "bg-red-950/40 border-red-500 shadow-lg shadow-red-900/20 ring-1 ring-red-500"
                  : "bg-gray-900/60 border-gray-800 hover:bg-gray-800/80 hover:border-gray-700"
              }`}
            >
              <div className="p-2 bg-gray-950/80 rounded-xl border border-gray-800 shrink-0">
                {method.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-sm font-bold text-white truncate">
                    {method.title}
                  </h4>
                  {method.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 border border-gray-700 shrink-0">
                      {method.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5 truncate">
                  {method.subtitle}
                </p>
              </div>

              <div className="pt-0.5">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? "border-red-500 bg-red-500"
                      : "border-gray-600 bg-transparent"
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PaymentMethodSelector;
