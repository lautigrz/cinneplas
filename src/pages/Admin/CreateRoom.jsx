import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import cinemaRoomService from "../../services/cinemaRoomService";
import { getRowLetter } from "../../constants/seatTypes";

import RoomHeader from "../../components/admin/RoomHeader";
import RoomSettingsForm from "../../components/admin/RoomSettingsForm";
import SeatToolSelector from "../../components/admin/SeatToolSelector";
import RoomStatsCard from "../../components/admin/RoomStatsCard";
import RoomGridCanvas from "../../components/admin/RoomGridCanvas";
import SeatLegendAdmin from "../../components/admin/SeatLegendAdmin";

const createDefaultSeatsLayout = (rows, cols) => {
  const newSeats = {};
  const centerCol = Math.floor(cols / 2);

  for (let y = 0; y < rows; y++) {
    if (y === 0 || y === Math.floor(rows / 2)) continue;

    for (let x = 0; x < cols; x++) {
      if (x === centerCol || x === centerCol - 1) continue;

      let type = "STANDARD";
      if (y >= rows - 3) type = "VIP";
      if (y === 1 && (x < 3 || x > cols - 4)) type = "WHEELCHAIR";

      const key = `${x}_${y}`;
      newSeats[key] = {
        position_x: x,
        position_y: y,
        type: type,
        is_active: true,
      };
    }
  }
  return newSeats;
};

function CreateRoom() {
  const location = useLocation();
  const navigate = useNavigate();

  // Datos recibidos desde CinemaDetailsModal via router state
  const cinemaIdPublic = location.state?.cinemaIdPublic ?? null;
  const cinemaName = location.state?.cinemaName ?? null;
  const initialRoomName = location.state?.roomName ?? "Sala 1 - IMAX 3D";

  const [roomName, setRoomName] = useState(initialRoomName);
  const [defaultPrice, setDefaultPrice] = useState(3500);
  const [gridRows, setGridRows] = useState(12);
  const [gridCols, setGridCols] = useState(20);

  const [selectedTool, setSelectedTool] = useState("STANDARD");
  const [seatsMap, setSeatsMap] = useState({});
  const [isMouseDown, setIsMouseDown] = useState(false);

  const [saveStatus, setSaveStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const generateDefaultLayout = (rows, cols) => {
    setSeatsMap(createDefaultSeatsLayout(rows, cols));
  };

  // Mapea el seatsMap interno al formato del schema del backend
  const processedSeats = useMemo(() => {
    const rowsGrouped = {};

    Object.values(seatsMap).forEach((seat) => {
      if (!rowsGrouped[seat.position_y]) {
        rowsGrouped[seat.position_y] = [];
      }
      rowsGrouped[seat.position_y].push(seat);
    });

    const sortedRowIndices = Object.keys(rowsGrouped)
      .map(Number)
      .sort((a, b) => a - b);

    const resultList = [];
    const keyToCalculated = {};

    sortedRowIndices.forEach((yIndex, rowOrder) => {
      const rowLetter = getRowLetter(rowOrder);

      const seatsInRow = rowsGrouped[yIndex].sort(
        (a, b) => a.position_x - b.position_x
      );

      seatsInRow.forEach((seat, seatOrder) => {
        const seatNumber = seatOrder + 1;

        // Formato que acepta el backend (CreateCinemaRoomSchema > SeatSchema)
        const backendSeat = {
          row: rowLetter,
          number: seatNumber,
          positionX: seat.position_x,
          positionY: seat.position_y,
          type: seat.type === "WHEELCHAIR" ? "STANDARD" : seat.type, // backend solo acepta STANDARD/VIP/PREMIUM
          isActive: seat.is_active ?? true,
          price: seat.type === "VIP" ? defaultPrice * 1.5
            : seat.type === "PREMIUM" ? defaultPrice * 2
            : defaultPrice,
        };

        resultList.push(backendSeat);
        keyToCalculated[`${seat.position_x}_${seat.position_y}`] = {
          rowLetter,
          seatNumber,
          label: `${rowLetter}${seatNumber}`,
        };
      });
    });

    return { list: resultList, mapLabels: keyToCalculated };
  }, [seatsMap, defaultPrice]);

  const handleCellInteract = (x, y) => {
    const key = `${x}_${y}`;
    setSeatsMap((prev) => {
      const next = { ...prev };
      if (selectedTool === "ERASER") {
        delete next[key];
      } else {
        next[key] = {
          position_x: x,
          position_y: y,
          type: selectedTool,
          is_active: true,
        };
      }
      return next;
    });
  };

  const handleMouseDownCell = (x, y) => {
    setIsMouseDown(true);
    handleCellInteract(x, y);
  };

  const handleMouseEnterCell = (x, y) => {
    if (isMouseDown) {
      handleCellInteract(x, y);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleClearAll = () => {
    if (window.confirm("¿Seguro que deseas borrar todos los asientos dibujados?")) {
      setSeatsMap({});
    }
  };

  const handleSaveRoom = async () => {
    setSaveStatus(null);

    if (!cinemaIdPublic) {
      setSaveStatus({ type: "error", message: "No se encontró el ID del cine. Volvé al panel de cines y accedé desde el modal de detalles." });
      return;
    }
    if (!roomName.trim() || roomName.trim().length < 2) {
      setSaveStatus({ type: "error", message: "El nombre de la sala debe tener al menos 2 caracteres." });
      return;
    }
    if (processedSeats.list.length === 0) {
      setSaveStatus({ type: "error", message: "Dibujá al menos un asiento en la cuadrícula antes de guardar." });
      return;
    }

    const payload = {
      cinemaIdPublic,
      name: roomName.trim(),
      capacity: processedSeats.list.length,
      seats: processedSeats.list,
    };

    setIsSaving(true);
    try {
      await cinemaRoomService.createCinemaRoom(payload);
      setSaveStatus({ type: "success", message: `¡Sala "${roomName}" guardada exitosamente con ${processedSeats.list.length} asientos!` });
      // Redirigir al panel de cines después de 2 segundos
      setTimeout(() => navigate("/admin/cinemas"), 2000);
    } catch (err) {
      setSaveStatus({ type: "error", message: err.message || "Error al guardar la sala." });
    } finally {
      setIsSaving(false);
    }
  };

  const stats = useMemo(() => {
    const total = processedSeats.list.length;
    const counts = { STANDARD: 0, VIP: 0, WHEELCHAIR: 0, PREMIUM: 0 };
    processedSeats.list.forEach((s) => {
      const type = s.type === "STANDARD" ? "STANDARD"
        : s.type === "VIP" ? "VIP"
        : s.type === "PREMIUM" ? "PREMIUM"
        : "WHEELCHAIR";
      counts[type]++;
    });
    return { total, counts };
  }, [processedSeats]);

  return (
    <div
      className="min-h-screen bg-(--color-background) text-white p-4 sm:p-6 lg:p-8 select-none"
      onMouseUp={handleMouseUp}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header con contexto del cine */}
        <RoomHeader
          onSaveRoom={handleSaveRoom}
          cinemaName={cinemaName}
          isSaving={isSaving}
        />

        {/* Banner de alerta si no hay cinemaIdPublic */}
        {!cinemaIdPublic && (
          <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
            <span>⚠️</span>
            <span>Accediste directamente a esta página. Para asociar la sala a un cine, <button onClick={() => navigate("/admin/cinemas")} className="underline cursor-pointer hover:text-yellow-200">volvé al panel de cines</button> y creá la sala desde el modal de detalles.</span>
          </div>
        )}

        {/* Feedback de guardado */}
        {saveStatus && (
          <div className={`mb-6 px-4 py-3 rounded-xl text-sm border flex items-center gap-2 ${
            saveStatus.type === "success"
              ? "bg-green-500/10 border-green-500/30 text-green-300"
              : "bg-red-500/10 border-red-500/30 text-red-300"
          }`}>
            <span>{saveStatus.type === "success" ? "✅" : "❌"}</span>
            <span>{saveStatus.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <RoomSettingsForm
            roomName={roomName}
            setRoomName={setRoomName}
            defaultPrice={defaultPrice}
            setDefaultPrice={setDefaultPrice}
            gridRows={gridRows}
            setGridRows={setGridRows}
            gridCols={gridCols}
            setGridCols={setGridCols}
            onGenerateDefaultLayout={generateDefaultLayout}
            onClearAll={handleClearAll}
          />

          <SeatToolSelector
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
          />

          <RoomStatsCard
            stats={stats}
            gridRows={gridRows}
            gridCols={gridCols}
          />
        </div>

        <RoomGridCanvas
          gridRows={gridRows}
          gridCols={gridCols}
          seatsMap={seatsMap}
          processedSeatsMapLabels={processedSeats.mapLabels}
          onMouseDownCell={handleMouseDownCell}
          onMouseEnterCell={handleMouseEnterCell}
        />

        <SeatLegendAdmin />
      </div>
    </div>
  );
}

export default CreateRoom;
