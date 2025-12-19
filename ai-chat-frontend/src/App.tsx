import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ChatPage } from './pages/ChatPage';
import { RegisterPage } from './pages/RegisterPage';
import type { JSX } from 'react';


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Si no hay token, te patea al login
    return <Navigate to="/login" replace />;
  }
  
  // Si hay token, te deja pasar al componente hijo (ChatPage)
  return children;
};
function App() {
  // Simulación simple de autenticación
  const isAuthenticated = !!localStorage.getItem('token'); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Ruta protegida simple */}
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/chat" 
          element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/chat" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;