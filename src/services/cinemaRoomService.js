import authService from "./authService";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function fetchApi(endpoint, options = {}) {
  const token = options.token ?? authService.getStoredToken();

  const headers = {
    ...(options.body && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
        ? (Array.isArray(data.message) ? data.message.join(", ") : data.message)
        : data || `Error en la solicitud: ${response.status}`;
    throw new Error(message);
  }

  return data;
}

/**
 * Crea una sala de cine con sus asientos en el backend.
 * @param {Object} payload
 * @param {string} payload.cinemaIdPublic - UUID público del cine al que pertenece la sala
 * @param {string} payload.name - Nombre de la sala
 * @param {number} payload.capacity - Cantidad total de asientos
 * @param {Array}  payload.seats - Asientos con { row, number, positionX, positionY, price, type, isActive }
 */
export async function createCinemaRoom({ cinemaIdPublic, name, capacity, seats }) {
  return fetchApi("/cinema-rooms", {
    method: "POST",
    body: JSON.stringify({ cinemaIdPublic, name, capacity, seats }),
  });
}

export default { createCinemaRoom };
