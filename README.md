# 🛒 E-commerce Backend - Backend III (Entrega Final)

Proyecto final para el curso de **Programación Backend III: Testing y Escalabilidad** en Coderhouse.
Esta API RESTful gestiona productos, carritos, usuarios, adopciones, el proceso completo de compra de un e-commerce y cuenta con un sistema de generación masiva de datos (Mocking) para pruebas de rendimiento. En esta entrega final se integró la documentación completa de la API, testing funcional independiente y la contenedorización optimizada del proyecto.

## 🚀 Tecnologías Utilizadas
- **Node.js & Express:** Servidor y ruteo.
- **MongoDB & Mongoose:** Persistencia de datos en la nube.
- **Passport.js & JWT:** Autenticación y autorización segura sin estado.
- **Bcrypt:** Hashing de contraseñas.
- **Swagger:** Documentación interactiva de la API (Módulo Users completo con esquemas, parámetros y respuestas de error).
- **Mocha, Chai, Supertest & MongoDB Memory Server:** Testing funcional automatizado e independiente (Módulo Adopciones).
- **Docker:** Contenedorización de la aplicación (con `npm ci --omit=dev`) y despliegue en Docker Hub.
- **Faker.js:** Generación de datos falsos realistas (mocking).
- **Nodemailer:** Envío de correos para recuperación de contraseñas.
- **UUID:** Generación de códigos alfanuméricos únicos para los tickets.

## 🐳 DockerHub y Ejecución
La imagen oficial de este proyecto está construida con `npm ci --omit=dev` (solo dependencias de producción) y alojada públicamente en Docker Hub.

**Enlace a la imagen:** [https://hub.docker.com/r/velde01/ecommerce-backend](https://hub.docker.com/r/velde01/ecommerce-backend)

### Construir la imagen localmente:
```bash
docker build -t velde01/ecommerce-backend:1.0.0 .

### Instrucciones para levantar con Docker:
La aplicación requiere variables de entorno (especialmente `MONGO_URI`) para iniciar la conexión a la base de datos.

1. **Descargar la imagen:**
   ```bash
   docker pull velde01/ecommerce-backend:1.0.0
   ```
2. **Ejecutar el contenedor pasando las variables de entorno:**

   **Opción A (usando tu archivo `.env` local):**
   ```bash
   docker run -p 8080:8080 --env-file .env -d velde01/ecommerce-backend:1.0.0
   ```

   **Opción B (pasando las variables directamente por consola):**
   ```bash
   docker run -p 8080:8080 -e PORT=8080 -e MONGO_URI="tu_uri_de_mongodb" -d velde01/ecommerce-backend:1.0.0
   ```

El servidor estará corriendo y accesible en `http://localhost:8080`.

## 📚 Documentación de la API (Swagger)
La API cuenta con documentación visual e interactiva implementada con Swagger para el módulo **Users** (`GET /api/users`, `GET /api/users/:uid`, `PUT /api/users/:uid`, `DELETE /api/users/:uid`), incluyendo el esquema completo de `User`, parámetros, `requestBodies` y códigos de respuesta de éxito y error (`200`, `400`, `404`, `500`).

Una vez levantado el servidor, puedes acceder a la documentación gráfica desde el navegador en:
`http://localhost:8080/apidocs`

## 🧪 Testing Funcional
Se implementaron 6 pruebas funcionales automatizadas utilizando **Mocha, Chai, Supertest** (recibiendo directamente la instancia `app` de Express) y **MongoDB Memory Server** para el router de adopciones (`/api/adoptions`).

Los tests son completamente independientes: no requieren levantar el servidor manualmente ni contar con conexión externa a MongoDB Atlas, y validan tanto casos de éxito reales (`201`, `200`) como respuestas de error (`404`).

Para correr la suite de tests:
```bash
npm install
npm test
```

## ⚙️ Arquitectura y Patrones
- Implementación de arquitectura por capas (Routing, Controllers, DAO).
- Uso de **DTOs (Data Transfer Objects)** para filtrar información sensible del usuario (ej. en la ruta `/current`).
- Middleware de autorización basado en roles (`admin` y `user`).
- **Módulo de Mocking:** Aislado en la capa de utilidades (`src/utils/mocking.js`).

## 🧪 Mocking y Generación de Datos
Se implementó un router específico en la ruta base `/api/mocks` para poblar la base de datos:
- `GET /api/mocks/mockingpets`: Devuelve mascotas generadas de forma simulada.
- `GET /api/mocks/mockingusers`: Genera y devuelve 50 usuarios mockeados (respetando el formato de MongoDB).
- `POST /api/mocks/generateData`: Recibe parámetros numéricos en el body para insertar registros masivamente en las colecciones.

## 🛒 Lógica de Compra
La ruta `POST /api/carts/:cid/purchase` verifica el stock de los productos en el carrito. Si hay stock suficiente, lo descuenta, calcula el total, genera un **Ticket** de compra y deja en el carrito únicamente los productos que no se pudieron procesar.

## 🛠️ Instalación y Uso Local (Sin Docker)
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias principales y de desarrollo.
3. Crear un archivo `.env` en la raíz con las variables de entorno necesarias (`PORT`, `MONGO_URI`, `JWT_SECRET`, credenciales de correo).
4. Ejecutar el servidor con `npm start`.

---
**Autor:** Mateo Bentos
**Curso:** Programación Backend III - Coderhouse