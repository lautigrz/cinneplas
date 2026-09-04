import { useState, useMemo, useEffect } from "react";
import cinemaService from "../../services/cinemaService";

import CinemaHeader from "../../components/admin/CinemaHeader";
import CinemaStatsCards from "../../components/admin/CinemaStatsCards";
import CinemaSearchBar from "../../components/admin/CinemaSearchBar";
import CinemaCard from "../../components/admin/CinemaCard";
import CinemaFormModal from "../../components/admin/CinemaFormModal";
import CinemaEditModal from "../../components/admin/CinemaEditModal";
import CinemaDetailsModal from "../../components/admin/CinemaDetailsModal";
import CinemaDeleteModal from "../../components/admin/CinemaDeleteModal";

function CinemaDashboard() {
  const [cinemas, setCinemas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCinema, setEditingCinema] = useState(null);
  const [viewingCinema, setViewingCinema] = useState(null);
  const [deletingCinemaId, setDeletingCinemaId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    rooms: [{ name: "Sala 1 - Principal" }]
  });

  const [newRoomForm, setNewRoomForm] = useState({ name: "", capacity: "" });

  const refreshCinemas = async () => {
    try {
      const list = await cinemaService.getAllCinemas();
      setCinemas(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error("Error fetching cinemas:", error);
      setCinemas([]);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshCinemas();
  }, []);

  const filteredCinemas = useMemo(() => {
    const list = Array.isArray(cinemas) ? cinemas : [];
    return list.filter((c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.address?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cinemas, searchTerm]);

  const stats = useMemo(() => {
    const list = Array.isArray(cinemas) ? cinemas : [];
    const totalCinemas = list.length;
    const totalRooms = list.reduce((acc, c) => acc + (c.rooms?.length || 0), 0);
    const totalCapacity = list.reduce((acc, c) => {
      return acc + (c.rooms?.reduce((rAcc, r) => rAcc + Number(r.capacity || 0), 0) || 0);
    }, 0);
    return { totalCinemas, totalRooms, totalCapacity };
  }, [cinemas]);

  // Handlers
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoomChange = (index, field, value) => {
    setFormData((prev) => {
      const newRooms = [...prev.rooms];
      newRooms[index] = { ...newRooms[index], [field]: value };
      return { ...prev, rooms: newRooms };
    });
  };

  const handleAddRoomField = () => {
    setFormData((prev) => ({
      ...prev,
      rooms: [...prev.rooms, { name: `Sala ${prev.rooms.length + 1}` }]
    }));
  };

  const handleRemoveRoomField = (index) => {
    setFormData((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((_, i) => i !== index)
    }));
  };

  const openCreateModal = () => {
    setFormData({
      name: "",
      address: "",
      rooms: [{ name: "Sala 1 3D" }]
    });
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.address.trim()) {
      alert("Por favor completa el nombre y la dirección del cine.");
      return;
    }
    cinemaService.createCinema(formData);
    setIsCreateModalOpen(false);
    refreshCinemas();
  };

  const openEditModal = (cinema) => {
    setEditingCinema(cinema);
    setFormData({
      name: cinema.name,
      address: cinema.address,
      rooms: cinema.rooms ? [...cinema.rooms] : []
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.address.trim()) {
      alert("Por favor completa el nombre y la dirección.");
      return;
    }
    cinemaService.updateCinema(editingCinema.id, formData);
    setEditingCinema(null);
    refreshCinemas();
  };

  const handleDeleteConfirm = () => {
    if (deletingCinemaId) {
      cinemaService.deleteCinema(deletingCinemaId);
      setDeletingCinemaId(null);
      refreshCinemas();
      if (viewingCinema?.id === deletingCinemaId) {
        setViewingCinema(null);
      }
    }
  };

  const handleAddRoomToViewingCinema = (e) => {
    e.preventDefault();
    if (!newRoomForm.name.trim()) {
      alert("Ingresa un nombre válido para la sala.");
      return;
    }
    cinemaService.addRoomToCinema(viewingCinema.id, newRoomForm);
    setNewRoomForm({ name: "", capacity: "" });
    const updated = cinemaService.getAllCinemas().find(c => c.id === viewingCinema.id);
    setViewingCinema(updated);
    refreshCinemas();
  };

  const handleDeleteRoomFromViewingCinema = (roomId) => {
    if (window.confirm("¿Seguro que deseas eliminar esta sala del cine?")) {
      cinemaService.deleteRoomFromCinema(viewingCinema.id, roomId);
      const updated = cinemaService.getAllCinemas().find(c => c.id === viewingCinema.id);
      setViewingCinema(updated);
      refreshCinemas();
    }
  };

  return (
    <div className="min-h-screen bg-(--color-background) text-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <CinemaHeader onOpenCreateModal={openCreateModal} />

        {/* Metric Cards */}
        <CinemaStatsCards stats={stats} />

        {/* Filter and Search Bar */}
        <CinemaSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredCount={filteredCinemas.length}
          totalCount={cinemas.length}
        />

        {/* Cinema Cards List */}
        {filteredCinemas.length === 0 ? (
          <div className="bg-(--color-card) border border-gray-800 rounded-2xl p-12 text-center">
            <span className="material-symbols-outlined text-5xl text-gray-600 mb-3">
              local_movie
            </span>
            <h3 className="text-lg font-bold text-white">No se encontraron cines</h3>
            <p className="text-sm text-gray-400 mt-1 max-w-md mx-auto">
              {searchTerm ? "Prueba cambiando el término de búsqueda." : "Aún no has registrado ningún cine en el sistema."}
            </p>
            {!searchTerm && (
              <button
                onClick={openCreateModal}
                className="mt-4 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Crear mi primer cine
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCinemas.map((cinema) => (
              <CinemaCard
                key={cinema.idPublic}
                cinema={cinema}
                onViewing={setViewingCinema}
                onEdit={openEditModal}
                onDelete={setDeletingCinemaId}
              />
            ))}
          </div>
        )}

        {/* Modales separados */}
        <CinemaFormModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateSubmit}
          formData={formData}
          onFormChange={handleFormChange}
          onRoomChange={handleRoomChange}
          onAddRoom={handleAddRoomField}
          onRemoveRoom={handleRemoveRoomField}
        />

        <CinemaEditModal
          cinema={editingCinema}
          onClose={() => setEditingCinema(null)}
          onSubmit={handleEditSubmit}
          formData={formData}
          onFormChange={handleFormChange}
        />

        <CinemaDetailsModal
          cinema={viewingCinema}
          onClose={() => setViewingCinema(null)}
          newRoomForm={newRoomForm}
          setNewRoomForm={setNewRoomForm}
          onAddRoom={handleAddRoomToViewingCinema}
          onDeleteRoom={handleDeleteRoomFromViewingCinema}
        />

        <CinemaDeleteModal
          cinemaId={deletingCinemaId}
          onClose={() => setDeletingCinemaId(null)}
          onConfirm={handleDeleteConfirm}
        />

      </div>
    </div>
  );
}

export default CinemaDashboard;
