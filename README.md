# Sistema de Gestión de Eventos

Este proyecto es una aplicación web para la gestión de eventos, inscripciones y administración de usuarios. Permite a los usuarios registrarse, iniciar sesión, inscribirse en eventos y a los administradores gestionar los eventos (crear, editar y eliminar).

## Características

- **Registro y Login de usuarios**
- **Roles de usuario:** usuario normal y administrador
- **Listado de eventos**
- **Inscripción a eventos**
- **Edición y eliminación de eventos (solo admin)**
- **Persistencia de sesión con LocalStorage**
- **Navegación SPA (Single Page Application)**
- **Consumo de APIs REST con fetch**

## Estructura del Proyecto

```
/Service/api.js         # Funciones para consumir la API (GET, POST, PUT, DELETE)
./Pages/                # Páginas HTML para cada vista
./app.js                # Lógica principal de la aplicación
./router.js             # Sistema de rutas SPA
```

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd <nombre-del-repo>
   ```
2. Instala y ejecuta el servidor JSON (si usas json-server):
   ```bash
   npm install -g json-server
   json-server --watch db.json --port 3000
   ```
3. Abre el proyecto en VS Code y ejecuta con Live Server o similar.

## Uso

- **Registro:** Completa el formulario de registro y crea tu usuario.
- **Login:** Inicia sesión con tu correo y contraseña.
- **Eventos:** Visualiza los eventos disponibles. Si eres usuario, puedes inscribirte. Si eres admin, puedes editar o eliminar eventos.
- **Inscripciones:** Consulta tus inscripciones desde la sección correspondiente.

## API

La aplicación consume una API REST con los siguientes endpoints:

- `GET /users` - Lista de usuarios
- `POST /users` - Crear usuario
- `GET /events` - Lista de eventos
- `POST /events` - Crear evento
- `PUT /events/:id` - Editar evento
- `DELETE /events/:id` - Eliminar evento
- `GET /enrollments` - Inscripciones
- `POST /enrollments` - Inscribirse a evento

## Tecnologías

- **JavaScript ES6**
- **HTML5**
- **CSS3**
- **json-server** (para simular la API REST)
- **FontAwesome** (iconos)

## Contribuir

¿Quieres mejorar el proyecto?  
Haz un fork, crea una rama y envía tu pull request.

## Autor

Desarrollado por Sebastian Mazo.

