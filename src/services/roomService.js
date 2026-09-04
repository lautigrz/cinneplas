
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const ROOMS_STORAGE_KEY = "cineplas_admin_rooms";

import { getStoredToken } from "./authService";

async function fetchApi(endpoint, options = {}) {
  const token = getStoredToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }

    if (!response.ok) {
      throw new Error(data.message || `Error en servidor: ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      console.error("Error de conexión (fetch). Verifique que el servidor esté funcionando.", error);
    }
    throw error;
  }
}

/**
 * Crear nueva sala con su mapa de asientos
 * @param {Object} roomData 
 * @param {string} roomData.name - Nombre de la sala (Ej: "Sala 1 3D Atmos")
 * @param {number} roomData.rows - Filas de la cuadrícula
 * @param {number} roomData.cols - Columnas de la cuadrícula
 * @param {Array} roomData.seats - Arreglo de asientos dibujados con la estructura de la DB
 */
export async function createRoomWithSeats(roomData) {
  try {
    const data = await fetchApi("/admin/rooms", {
      method: "POST",
      body: JSON.stringify(roomData),
    });
    return data;
  } catch (error) {
    if (error.message === "API_OFFLINE") {
      console.warn("API offline: Guardando sala localmente para prueba.");

      const storedRooms = getStoredRooms();
      const newRoom = {
        ...roomData,
        id: roomData.id || crypto.randomUUID(),
        created_at: new Date().toISOString(),
      };

      storedRooms.push(newRoom);
      localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(storedRooms));

      return {
        success: true,
        isMock: true,
        room: newRoom,
        message: "Sala guardada localmente (Modo demo offline).",
      };
    }
    throw error;
  }
}

export function getStoredRooms() {
  const rooms = localStorage.getItem(ROOMS_STORAGE_KEY);
  try {
    return rooms ? JSON.parse(rooms) : [];
  } catch (e) {
    console.error("Error cargando salas locales:", e);
    return [];
  }
}

export default {
  createRoomWithSeats,
  getStoredRooms,
};
