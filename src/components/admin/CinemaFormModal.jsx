import { useState } from "react";

function CinemaFormModal({ isOpen, onClose, onSubmit, formData, onFormChange, onRoomChange, onAddRoom, onRemoveRoom }) {
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    const name = formData.name ? formData.name.trim() : "";
    const address = formData.address ? formData.address.trim() : "";

    if (!name) {
      newErrors.name = "El nombre del cine es obligatorio.";
    } else if (name.length < 5) {
      newErrors.name = "El nombre debe tener al menos 5 caracteres.";
    }

    if (!address) {
      newErrors.address = "La dirección del cine es obligatoria.";
    } else if (address.length < 10) {
      newErrors.address = "La dirección debe tener al menos 10 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(e);
      setErrors({});
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const handleFieldChange = (field, value) => {
    onFormChange(field, value);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-(--color-card) border border-gray-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-800">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🏢 Registrar Nuevo Cine</span>
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
              Nombre del Cine <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Cineplas Abasto Shopping"
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              className={`w-full px-3.5 py-2.5 bg-gray-900 border rounded-xl text-sm text-white focus:outline-none transition-colors ${errors.name ? "border-red-500 focus:border-red-500" : "border-gray-800 focus:border-red-500/50"
                }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1 font-medium flex items-center gap-1">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
              Dirección Completa <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Av. Corrientes 3247, CABA"
              value={formData.address}
              onChange={(e) => handleFieldChange("address", e.target.value)}
              className={`w-full px-3.5 py-2.5 bg-gray-900 border rounded-xl text-sm text-white focus:outline-none transition-colors ${errors.address ? "border-red-500 focus:border-red-500" : "border-gray-800 focus:border-red-500/50"
                }`}
            />
            {errors.address && (
              <p className="text-xs text-red-500 mt-1 font-medium flex items-center gap-1">
                {errors.address}
              </p>
            )}
          </div>

          <div className="border-t border-gray-800 pt-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-white">Salas del Cine (CinemaRoom)</h4>
                <p className="text-xs text-gray-400">Puedes ingresar el nombre de las salas iniciales</p>
              </div>
              <button
                type="button"
                onClick={onAddRoom}
                className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1.5 rounded-lg border border-gray-700 flex items-center gap-1 cursor-pointer"
              >
                + Añadir Sala
              </button>
            </div>

            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {formData.rooms.map((room, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-gray-900/80 p-2.5 rounded-xl border border-gray-800">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Nombre sala (ej: Sala 1)"
                      value={room.name}
                      onChange={(e) => onRoomChange(idx, "name", e.target.value)}
                      className="w-full bg-gray-800 px-2.5 py-1.5 rounded-lg text-xs text-white border border-gray-700 focus:outline-none"
                    />
                  </div>
                  {formData.rooms.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveRoom(idx)}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-400 hover:text-white cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold shadow-lg shadow-red-500/20 cursor-pointer"
            >
              Guardar Cine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CinemaFormModal;
