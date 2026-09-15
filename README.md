# 🛒 E-commerce Backend - Entrega Final

Proyecto final para el curso de **Programación Backend II: Diseño y Arquitectura** (Coderhouse).
Esta API RESTful gestiona productos, carritos, usuarios y el proceso completo de compra de un e-commerce.

## 🚀 Tecnologías Utilizadas
*   **Node.js & Express:** Servidor y ruteo.
*   **MongoDB & Mongoose:** Persistencia de datos en la nube.
*   **Passport.js & JWT:** Autenticación y autorización segura sin estado.
*   **Bcrypt:** Hashing de contraseñas.
*   **Nodemailer:** Envío de correos para recuperación de contraseñas.
*   **UUID:** Generación de códigos alfanuméricos únicos para los tickets.

## ⚙️ Arquitectura y Patrones
*   Implementación de arquitectura por capas (Routing, Controllers, DAO).
*   Uso de **DTOs (Data Transfer Objects)** para filtrar información sensible del usuario (ej. en la ruta `/current`).
*   Middleware de autorización basado en roles (`admin` y `user`).

## 🛒 Lógica de Compra
La ruta `POST /api/carts/:cid/purchase` verifica el stock de los productos en el carrito. Si hay stock suficiente, lo descuenta, calcula el total, genera un **Ticket** de compra y deja en el carrito únicamente los productos que no se pudieron procesar.

## 🛠️ Instalación y Uso
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Crear un archivo `.env` en la raíz basado en las variables de entorno necesarias (Puerto, Mongo URI, JWT Secret, credenciales de correo).
4. Ejecutar el servidor con `npm start`.

---
**Autor:** Mateo Bentos
**Curso:** Programación Backend II - Coderhouse