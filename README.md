# favorite-links-nodejs
Repository to make an example api using the MySQL database

## Paquetes utilizados
- **express:** Framework para el back
- **express-handlebars:** Integración del motor de plantillas handlebars en expres.
- **express-session:** Administra las sesiones de la app.
- **mysql:** Se conecta y hace consultas a la base de datos.
- **express-mysql-session:** Almacenará las sesiones en la base de datos.
- **bcryptjs:** Cifra las contraseñas de los usuraios.
- **passport:** Para autenticar y manejar el proceso del login.
- **passport-local:** Complemento de passport para autenticar usuarios en la base de datos
- **timeago.js:** Convierte los timestamps a formato 2 minutes ago, 2 hours ago
- **connect-flash:** Mostrar mensajes de exito o error al realizar una acción.
- **morgan:** permite crear logs de las peticiones al servidor
- **express-validator:** Valida los datos que le llegan a la petición.
- **dotenv:** Cargar variables de ambiente.

Desarrollo
- **nodemon:** Reinicia el servidor al haber cambios.

## Estructura del proyecto
carpetas
 - **src**
	- **lib**
	- **public:**
	- **routes:** Sistema de rutas para el api
	- **views:** vistas de la aplicación
		- **layout:** Partes comunes de la aplicación (header, nav, etc).
		- **partials:** Partes de las vistas que se usan en varias partes.