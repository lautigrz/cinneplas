function BuyerInfoForm({ formData, onChange }) {
  return (
    <div className="bg-(--color-card) border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
        <span className="text-red-500 text-lg">👤</span>
        <h3 className="text-base font-bold text-white">Datos del Comprador</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Nombre Completo *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            placeholder="Juan Pérez"
            required
            className="w-full bg-gray-900/90 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            DNI / CUIT *
          </label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={onChange}
            placeholder="12345678"
            required
            className="w-full bg-gray-900/90 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Correo Electrónico (Recepción de entradas) *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="tu@email.com"
            required
            className="w-full bg-gray-900/90 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Teléfono de Contacto
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="+54 11 1234-5678"
            className="w-full bg-gray-900/90 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default BuyerInfoForm;
