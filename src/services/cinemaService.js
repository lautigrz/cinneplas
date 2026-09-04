import authService from "../services/authService";

const CINEMAS_STORAGE_KEY = "cineplas_admin_cinemas";


const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";


async function fetchApi(endpoint, options = {}) {
  const token = options.token ?? authService.getStoredToken();

  const headers = {
    ...(options.body && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type");

  const data = contentType?.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "object"
        ? data.message
        : data || `Error en la solicitud: ${response.status}`;

    throw new Error(message);
  }

  return data;
}


export function saveCinemas(cinemas) {
  try {
    localStorage.setItem(CINEMAS_STORAGE_KEY, JSON.stringify(cinemas));
  } catch (error) {
    console.error("Error saving cinemas to localStorage:", error);
  }
}

export async function createCinema({ name, address, rooms = [] }) {
  const cinema = {
    name: name.trim(),
    address: address.trim(),
    rooms: rooms.map((room) => ({
      name: room.name.trim(),
      capacity: Number(room.capacity) || 0,
    })),
  };

  return fetchApi(`${API_BASE_URL}/cinemas`, {
    method: "POST",
    body: JSON.stringify(cinema),
  });
}


export async function getAllCinemas() {
  return fetchApi(`${API_BASE_URL}/cinemas`, {
    method: "GET",
  });
}

export function updateCinema(id, { name, address, rooms }) {
  const cinemas = null;
  const updatedCinemas = cinemas.map((cinema) => {
    if (cinema.id === id) {
      const updatedRooms = rooms ? rooms.map((r, idx) => ({
        id: r.id || Date.now() + idx,
        name: r.name,
        capacity: Number(r.capacity) || 0,
        cinemaId: id,
        createdAt: r.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })) : cinema.rooms;

      return {
        ...cinema,
        name: name !== undefined ? name.trim() : cinema.name,
        address: address !== undefined ? address.trim() : cinema.address,
        rooms: updatedRooms,
        updatedAt: new Date().toISOString(),
      };
    }
    return cinema;
  });

  saveCinemas(updatedCinemas);
  return updatedCinemas.find(c => c.id === id);
}

export function deleteCinema(id) {
  const cinemas = null
  const filtered = cinemas.filter((c) => c.id !== id);
  saveCinemas(filtered);
  return true;
}

export function addRoomToCinema(cinemaId, { name, capacity }) {
  const cinemas = null
  const target = cinemas.find(c => c.id === cinemaId);
  if (!target) return null;

  const newRoom = {
    id: Date.now(),
    name: name.trim(),
    capacity: Number(capacity) || 0,
    cinemaId: cinemaId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  target.rooms.push(newRoom);
  target.updatedAt = new Date().toISOString();
  saveCinemas(cinemas);
  return newRoom;
}

export function deleteRoomFromCinema(cinemaId, roomId) {
  const cinemas = null;
  const target = cinemas.find(c => c.id === cinemaId);
  if (!target) return false;

  target.rooms = target.rooms.filter(r => r.id !== roomId);
  target.updatedAt = new Date().toISOString();
  saveCinemas(cinemas);
  return true;
}

export default {
  getAllCinemas,
  saveCinemas,
  createCinema,
  updateCinema,
  deleteCinema,
  addRoomToCinema,
  deleteRoomFromCinema,
};
