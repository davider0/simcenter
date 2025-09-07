# Centro de Simulación 📊

MERN Stack para proyectos con APIs Restful y 3D (Three.js).

## Índice 📚

- [Arquitectura del Proyecto 🏗️](#arquitectura-del-proyecto-️)
- [Configuración y Despliegue Local ⚙️](#configuración-y-despliegue-local-️)
- [Tecnologías Clave 🔑](#tecnologías-clave-️)
- [Licencia 📄](#licencia-️)

## Arquitectura del Proyecto 🏗️

La solución se compone de dos componentes principales:

- **Frontend (React/Vite):** Interfaz de usuario para la gestión y visualización de operaciones
- **Backend (Node.js/Express):** API RESTful que gestiona la lógica de negocio, la interacción con la APIs

Actualmente se están llevando a cabo los siguientes proyectos:
- Frontend del temporizador del iPhone con Three.js (en proceso)
- Menú principal inspirado en otro proyecto mío (en proceso)

## Configuración y Despliegue Local ⚙️

Para configurar y ejecutar el proyecto en un entorno de desarrollo local, sigue los siguientes pasos:

1.  **Clonación del Repositorio:**

    ```bash
    git clone http://github.com/davider0/simcenter
    cd simcenter
    ```

2.  **Configuración y Ejecución del Frontend:**
    Navegue al directorio raíz del proyecto e instale las dependencias del frontend, luego inicie el servidor de desarrollo:

    ```bash
    npm install
    npm run dev
    ```

    Esto iniciará el servidor de desarrollo del frontend, accesible típicamente en `http://localhost:5173`.

3.  **Configuración y Ejecución del Backend:**
    Abra una nueva terminal, navegue al subdirectorio `server`, instale las dependencias del backend y ejecute el servidor:
    ```bash
    cd server
    npm install
    npm run server
    ```
    El servidor backend se iniciará, generalmente escuchando en `http://localhost:5000`.

## Tecnologías Clave 🔑

- **Frontend:** React, Vite, CSS Modules
- **Backend:** Node.js, Express.js
- **Integración:** varias APIs de mercado y servicios externos

## Licencia 📄

No hay. Copia y pega todo lo que quieras
