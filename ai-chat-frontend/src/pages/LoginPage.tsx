import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../services/api'; 


export const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // 2. Usamos 'api' en lugar de 'fetch' o 'axios' directo
      // Esto enviará a: http://localhost:3000/auth/login
      const response = await api.post('/auth/login', data);
      
      // Asumiendo que NestJS devuelve: { access_token: "..." }
      const token = response.data.access_token; 
      
      // Guardamos el token real
      localStorage.setItem('token', token);
      
      // Redirigimos al chat
      navigate('/chat');
      
    } catch (error) {
      console.error("Error en login:", error);
      alert("Credenciales incorrectas o error en el servidor");
    }
  };
  return (
    // CLAVE DEL ÉXITO: 
    // min-h-screen: Obliga a ocupar el 100% de la altura de la ventana.
    // flex items-center justify-center: Centra el contenido (la tarjeta) en medio.
    // bg-gray-100: El color de fondo gris claro de toda la página.
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      {/* ESTA ES LA TARJETA (CARD) */}
      {/* w-full max-w-md: Ancho completo pero con tope (tamaño tarjeta) */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Iniciar Sesión</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "El email es requerido" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <span className="text-red-500 text-xs">{String(errors.email.message)}</span>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              {...register("password", { required: "La contraseña es requerida" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && <span className="text-red-500 text-xs">{String(errors.password.message)}</span>}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
