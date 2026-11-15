# 🛒 E-commerce Backend - Backend III (Entrega Final)

Proyecto final para el curso de **Programación Backend III: Testing y Escalabilidad** en Coderhouse.
Esta API RESTful gestiona productos, carritos, usuarios, el proceso completo de compra de un e-commerce y cuenta con un sistema de generación masiva de datos (Mocking) para pruebas de rendimiento. En esta entrega final se integró la documentación de la API, testing funcional y la contenedorización del proyecto.

## 🚀 Tecnologías Utilizadas
- **Node.js & Express:** Servidor y ruteo.
- **MongoDB & Mongoose:** Persistencia de datos en la nube.
- **Passport.js & JWT:** Autenticación y autorización segura sin estado.
- **Bcrypt:** Hashing de contraseñas.
- **Swagger:** Documentación interactiva de la API (Módulo Users).
- **Mocha, Chai & Supertest:** Testing funcional automatizado (Módulo Adopciones).
- **Docker:** Contenedorización de la aplicación y despliegue en Docker Hub.
- **Faker.js:** Generación de datos falsos realistas (mocking).
- **Nodemailer:** Envío de correos para recuperación de contraseñas.
- **UUID:** Generación de códigos alfanuméricos únicos para los tickets.

## 🐳 DockerHub y Ejecución
La imagen oficial de este proyecto se encuentra empaquetada y alojada públicamente en Docker Hub.

**Enlace a la imagen:** [https://hub.docker.com/r/velde01/ecommerce-backend](https://hub.docker.com/r/velde01/ecommerce-backend)

### Instrucciones para levantar con Docker:
Para descargar y ejecutar el contenedor en cualquier entorno con Docker instalado:

1. **Descargar la imagen:**
   ```bash
   docker pull velde01/ecommerce-backend:1.0.0
   ```
2. **Ejecutar el contenedor:**
   ```bash
   docker run -p 8080:8080 -d velde01/ecommerce-backend:1.0.0
   ```
El servidor estará corriendo y accesible en `http://localhost:8080`.

## 📚 Documentación de la API (Swagger)
La API cuenta con documentación visual e interactiva implementada con Swagger.
Una vez levantado el servidor, puedes acceder a la documentación gráfica desde el navegador en:
`http://localhost:8080/apidocs`

## 🧪 Testing Funcional
Se implementaron pruebas funcionales automatizadas utilizando Mocha, Chai y Supertest para verificar la robustez del router de adopciones (`/api/adoptions`).
Para correr los tests en un entorno local de desarrollo:
```bash
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
2. Ejecutar `npm install` para instalar las dependencias principales.
3. Crear un archivo `.env` en la raíz con las variables de entorno necesarias (Puerto, Mongo URI, JWT Secret, credenciales de correo).
4. Ejecutar el servidor con `npm start`.

---
**Autor:** Mateo Bentos
**Curso:** Programación Backend III - Coderhouse