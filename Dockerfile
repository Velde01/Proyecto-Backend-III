# 1. Definir la imagen base de Node.js
FROM node:20-alpine

# 2. Crear y definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar los archivos de dependencias
COPY package*.json ./

# 4. Instalar las dependencias (ignorando dependencias de desarrollo para producción)
RUN npm install

# 5. Copiar el resto del código del proyecto
COPY . .

# 6. Exponer el puerto en el que corre tu app (asumiendo que usas el 8080)
EXPOSE 8080

# 7. Comando para arrancar la aplicación
CMD ["npm", "start"]