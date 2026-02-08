# Tripleten web_project_api_full

# Descripción del proyecto

Este proyecto es un servidor básico desarrollado con **Express.js** que simula una API para una red social minimalista. Proporciona endpoints para obtener información sobre usuarios y tarjetas (cards). El objetivo principal es practicar la creación de un backend RESTful simple usando archivos JSON como fuente de datos.

# Funcionalidades

- `GET /users`: Devuelve todos los usuarios.
- `GET /cards`: Devuelve todas las tarjetas (posts).
- `GET /users/:id`: Devuelve los datos de un usuario específico por su ID.
- `GET /`: Ruta raíz con mensaje de bienvenida.
- `*`: Ruta genérica para cualquier endpoint no definido (devuelve error 404).

# Tecnologías y técnicas utilizadas

**Node.js** y **Express.js** para la creación del servidor.
- **fs.promises** para lectura de archivos asincrónica desde el sistema de archivos.
- **Nodemon** para reinicio automático del servidor durante el desarrollo.
- **JSON** como fuente de datos simulada (mock data).
- Buenas prácticas en manejo de errores (errores 404 y 500).
- Estructura modular y mantenible para futuras expansiones de la API.


# Iniciar servidor

- `npm run dev` inicia el servidor en `localhost:3000` con recarga en caliente (hot reload).


# Ejecución

- `npm run start` es para ejecución en producción sin nodemon.

