function MercadoPagoView({ amount }) {
  return (
    <div className="bg-(--color-card) border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4 text-center">
      <div className="flex items-center justify-center gap-2 border-b border-gray-800 pb-3">
        <span className="text-xl font-black text-sky-400">MP</span>
        <h3 className="text-base font-bold text-white">Pago con Mercado Pago</h3>
      </div>

      <div className="bg-sky-950/30 border border-sky-800/40 p-4 rounded-2xl flex flex-col items-center space-y-3">
        <p className="text-xs text-sky-200">
          Escanea este código QR con la app de <strong>Mercado Pago</strong> o tu banca móvil
        </p>

        {/* QR Code Mockup */}
        <div className="p-3 bg-white rounded-2xl shadow-xl border-4 border-sky-500/30">
          <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
            <rect width="100" height="100" fill="white" />
            <path d="M10 10h30v30H10zM60 10h30v30H60zM10 60h30v30H10z" fill="black" />
            <path d="M18 18h14v14H18zM68 18h14v14H68zM18 68h14v14H18z" fill="white" />
            <path d="M50 10h5v10h-5zM45 25h10v5h-10zM50 60h15v5h-15zM65 50h10v15h-10zM80 60h10v30h-10zM50 75h25v15h-25z" fill="black" />
          </svg>
        </div>

        <div className="text-xs text-gray-400">
          Monto total: <strong className="text-white text-sm">${amount?.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
}

export default MercadoPagoView;
