# 🛒 E-commerce Backend - Backend III (Entrega 1)

Proyecto para el curso de **Programación Backend III: Testing y Escalabilidad** (Coderhouse).
Esta API RESTful gestiona productos, carritos, usuarios, el proceso completo de compra de un e-commerce y cuenta con un sistema de generación masiva de datos (Mocking) para pruebas de rendimiento.

## 🚀 Tecnologías Utilizadas
- **Node.js & Express:** Servidor y ruteo.
- **MongoDB & Mongoose:** Persistencia de datos en la nube.
- **Passport.js & JWT:** Autenticación y autorización segura sin estado.
- **Bcrypt:** Hashing de contraseñas.
- **Faker.js:** Generación de datos falsos realistas (mocking) para testing.
- **Nodemailer:** Envío de correos para recuperación de contraseñas.
- **UUID:** Generación de códigos alfanuméricos únicos para los tickets.

## ⚙️ Arquitectura y Patrones
- Implementación de arquitectura por capas (Routing, Controllers, DAO).
- Uso de **DTOs (Data Transfer Objects)** para filtrar información sensible del usuario (ej. en la ruta `/current`).
- Middleware de autorización basado en roles (`admin` y `user`).
- **Módulo de Mocking:** Aislado en la capa de utilidades (`src/utils/mocking.js`) para separar la lógica de generación de datos de los controladores.

## 🧪 Mocking y Generación de Datos
Se implementó un router específico en la ruta base `/api/mocks` para poblar la base de datos y realizar pruebas de carga:
- `GET /api/mocks/mockingpets`: Devuelve mascotas generadas de forma simulada.
- `GET /api/mocks/mockingusers`: Genera y devuelve 50 usuarios mockeados (con contraseñas encriptadas, arrays vacíos y roles aleatorios) respetando el formato de MongoDB.
- `POST /api/mocks/generateData`: Recibe parámetros numéricos (`users`, `pets`) en el body para generar e insertar masivamente esa cantidad de registros directamente en las colecciones de la base de datos.
- `GET /api/users`: Servicio habilitado para comprobar y listar todos los registros de usuarios insertados.

## 🛒 Lógica de Compra
La ruta `POST /api/carts/:cid/purchase` verifica el stock de los productos en el carrito. Si hay stock suficiente, lo descuenta, calcula el total, genera un **Ticket** de compra y deja en el carrito únicamente los productos que no se pudieron procesar.

## 🛠️ Instalación y Uso
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias principales y las herramientas de testing (`@faker-js/faker`).
3. Crear un archivo `.env` en la raíz basado en las variables de entorno necesarias (Puerto, Mongo URI, JWT Secret, credenciales de correo).
4. Ejecutar el servidor con `npm start`.

---
**Autor:** Mateo Bentos
**Curso:** Programación Backend III - Coderhouse