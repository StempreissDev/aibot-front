Entendido. Aquí tienes el contenido completo para tu documentación. Está redactado en texto plano y limpio para que puedas copiarlo y pegarlo directamente donde prefieras (un archivo de texto, un Word o el cuerpo del README), incluyendo la sección crítica de **Configuración** explicada detalladamente.

* * * * *

**PROYECTO: AI SALES ASSISTANT (FRONTEND)** **Manual de Instalación y Configuración**

**DESCRIPCIÓN GENERAL** Este proyecto constituye la interfaz de usuario (Frontend) para la Prueba Técnica "Full Stack AI Chat". Desarrollada con React, TypeScript y Vite, esta aplicación simula un chat de ventas inteligente que se comunica en tiempo real con una API Backend.

**REQUISITOS PREVIOS** Antes de iniciar, asegúrate de tener instalado el siguiente software en tu equipo:

1.  Node.js (Versión 16 o superior).

2.  NPM (Gestor de paquetes incluido con Node.js).

* * * * *

**GUÍA DE INSTALACIÓN PASO A PASO**

**Paso 1: Instalación de Dependencias** El proyecto requiere una serie de librerías externas (React, Tailwind, Axios, etc.) para funcionar.

1.  Abre tu terminal o línea de comandos.

2.  Navega hasta la carpeta raíz del proyecto (`ai-chat-frontend`).

3.  Ejecuta el siguiente comando para descargar e instalar todo automáticamente:

npm install

* * * * *

**Paso 2: Configuración del Entorno (IMPORTANTE)** Para que el Frontend pueda comunicarse con el Backend (NestJS), es necesario configurar la dirección de la API. Sin este paso, el inicio de sesión no funcionará.

1.  En la carpeta raíz del proyecto (al mismo nivel que el archivo `package.json`), crea un nuevo archivo llamado: `.env`

2.  Abre ese archivo `.env` con cualquier editor de texto.

3.  Pega la siguiente línea de código dentro del archivo:

VITE_API_URL=http://localhost:3000

*Nota: Si tu backend está ejecutándose en un puerto diferente al 3000, cambia el número en la URL anterior.*

* * * * *

**Paso 3: Ejecución del Proyecto** Una vez instaladas las dependencias y configurado el entorno, puedes iniciar el servidor de desarrollo.

1.  En la terminal, ejecuta el comando:

npm run dev

1.  La terminal mostrará que el servidor está listo. Por lo general, la dirección será: http://localhost:5173

2.  Abre esa dirección en tu navegador web (Chrome, Edge, Firefox).

* * * * *

**USO DE LA APLICACIÓN**

1.  **Login:** Al abrir la aplicación, serás redirigido a la pantalla de inicio de sesión. Ingresa tus credenciales o utiliza el enlace de registro.

2.  **Registro:** Si no tienes cuenta, ve a la opción "Regístrate aquí", completa el formulario y serás redirigido al login.

3.  **Chat:** Una vez autenticado, accederás al Chat. Escribe un mensaje en la barra inferior y presiona "Enviar". El mensaje se mostrará inmediatamente (interfaz optimista) y recibirás la respuesta de la IA en unos segundos.

* * * * *

**ESTRUCTURA TÉCNICA**

El código fuente se encuentra en la carpeta `/src` y está organizado de la siguiente manera:

-   **components/:** Contiene elementos visuales reutilizables.

-   **pages/:** Contiene las vistas principales (LoginPage, RegisterPage, ChatPage).

-   **services/:** Contiene la configuración de Axios (`api.ts`) y los interceptores de seguridad para el manejo de Tokens JWT.

-   **types/:** Definiciones de TypeScript para asegurar la integridad de los datos.

**Tecnologías Utilizadas:**

-   React + TypeScript + Vite

-   Tailwind CSS (Estilos)

-   Axios (Conexión HTTP)

-   React Router DOM (Navegación)

-   React Hook Form (Manejo de formularios)

* * * * *

**SOLUCIÓN DE PROBLEMAS COMUNES**

-   **Error "VITE_API_URL is not defined":** Asegúrate de haber creado el archivo `.env` en la raíz y no dentro de `src`. Reinicia la terminal después de crear el archivo.

-   **Estilos rotos:** Si la interfaz se ve sin formato, asegúrate de que el servidor de desarrollo (`npm run dev`) esté corriendo y no haya errores en la consola relacionados con Tailwind.
