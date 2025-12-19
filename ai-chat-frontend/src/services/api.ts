import axios from 'axios';

// 1. Crear la instancia básica de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Lee la url del archivo .env
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. INTERCEPTOR DE SOLICITUD (Request Interceptor)
// Antes de que salga cualquier petición, este código se ejecuta.
api.interceptors.request.use(
  (config) => {
    // Buscamos si hay un token guardado en el navegador
    const token = localStorage.getItem('token');

    // Si hay token, lo agregamos al encabezado "Authorization"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. INTERCEPTOR DE RESPUESTA (Response Interceptor)
// Cuando el servidor (NestJS) responde, revisamos esto primero.
api.interceptors.response.use(
  (response) => response, // Si todo salió bien, deja pasar la respuesta
  (error) => {
    // Si el servidor nos dice "401 Unauthorized" (No autorizado)
    if (error.response && error.response.status === 401) {
      // Significa que el token venció o es falso
      localStorage.removeItem('token'); // Borramos el token basura
      window.location.href = '/login';  // Redirigimos al usuario al login forzosamente
    }
    return Promise.reject(error);
  }
);

export default api;
