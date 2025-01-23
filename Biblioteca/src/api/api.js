import axios from "axios";


// Crear instancia de Axios con configuración predeterminada
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000", // URL base de la API 
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptores (opcional, pero recomendado para manejar tokens y errores globales)

// Agregar el token de autenticación si está disponible
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Asegúrate de almacenar tu token de usuario aquí
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Manejar errores globalmente (opcional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la respuesta de la API:", error.response || error.message);
    // Puedes manejar errores específicos según el código de estado
    if (error.response?.status === 401) {
      console.warn("No autorizado. Redirigiendo al login...");
      // Realiza acciones específicas, como redirigir al login
    }
    return Promise.reject(error);
  }
);

// Función para obtener libros
export const obtenerLibros = () => {
  return api.get("/libros");
};

// Función para crear una reserva
export const crearReserva = (data) => {
  return api.post("/reservas", data);
};

// Función para registrarse
export const register = (data) => {
  return api.post("/register", data);
};

// Función para iniciar sesión
export const login = (data) => {
  return api.post("/login", data);
};
export default api;

