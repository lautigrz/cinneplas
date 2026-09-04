
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const TOKEN_KEY = "cineplas_auth_token";

async function fetchApi(endpoint, options = {}) {
  const token = options.token || getStoredToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }

    if (!response.ok) {
      throw new Error(data.message || `Error en la solicitud: ${response.status}`);
    }

    return data;
  } catch (error) {

    if (error.name === "TypeError" && error.message.includes("fetch")) {
      console.log(error);
    }
    throw error;
  }
}

export async function login({ email, password }) {
  try {

    const data = await fetchApi("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.accessToken) {
      setStoredToken(data.accessToken);
    }


    return data;
  } catch (error) {

    throw new error;
  }
}

export async function loginWithGoogle() {
  window.location.href = `${API_BASE_URL}/auth/google`;
}

/**
 * Registrar nuevo usuario
 * @param {Object} userData 
 * @param {string} userData.name
 * @param {string} userData.email 
 * @param {string} userData.password 
 */
export async function register({ name, email, password }) {
  try {
    const data = await fetchApi("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    if (data.token) setStoredToken(data.token);

    return data;
  } catch (error) {
    throw new error;
  }
}

export async function getProfile(customToken) {
  return await fetchApi("/auth/me", {
    method: "GET",
    ...(customToken ? { token: customToken } : {}),
  });
}


export function logout() {
  removeStoredToken();
}


export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
}



export function isAuthenticated() {
  return !!getStoredToken();
}

export default {
  login,
  loginWithGoogle,
  register,
  logout,
  getProfile,
  getStoredToken,
  setStoredToken,
  removeStoredToken,
  isAuthenticated,
};
