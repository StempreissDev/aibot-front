import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// Definimos la estructura de un mensaje para TypeScript
interface Message {
  id: number | string;
  content: string;
  sender: 'user' | 'bot'; // Esto es clave para el estilo
  timestamp: Date;
}

export const ChatPage = () => {
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState('');
  // Estado inicial simulado
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: 'Hola, soy tu asistente de ventas. ¿En qué puedo ayudarte hoy?', sender: 'bot', timestamp: new Date() }
  ]);
  
  // Referencia para el scroll automático
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // 1. Guardamos el texto temporalmente para enviarlo, porque limpiaremos el input
    const messageToSend = inputMessage;

    // 2. Agregar mensaje del usuario inmediatamente (Optimistic UI)
    // Usamos Date.now() temporalmente
    const newUserMsg: Message = {
      id: Date.now(), 
      content: messageToSend,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputMessage(''); // Limpiar input visualmente

    try {
      // 3. Llamada a la API
      const response = await api.post('/chat/send', { message: messageToSend });
      console.log("Respuesta de la API:", response.data);

      // 4. Extraemos la parte del bot de tu JSON
      const { botResponse } = response.data;

      // 5. Creamos el objeto del mensaje del bot con los datos REALES
      const newBotMsg: Message = {
        id: botResponse.id, // ID único que viene del backend (UUID)
        content: botResponse.content, // "¡Hola! ¡Perfecto! Podemos crear..."
        sender: 'bot',
        timestamp: new Date(botResponse.createdAt) // Convertimos la fecha string a objeto Date
      };

      setMessages(prev => [...prev, newBotMsg]);

    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      // Opcional: Aquí podrías mostrar una alerta o borrar el mensaje del usuario si falló
    }
  };


  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Asistente de Ventas AI</h1>
        <button 
          onClick={handleLogout}
          className="text-sm text-red-600 hover:text-red-800 font-medium"
        >
          Cerrar Sesión
        </button>
      </header>

      {/* Área de Mensajes (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <span className={`text-xs block mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                {msg.sender === 'bot' ? 'IA' : 'Tú'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Div invisible para scroll */}
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            disabled={!inputMessage.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};
