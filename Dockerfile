FROM node:20-alpine

WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala únicamente las dependencias de producción (sin mocha, chai, etc.)
RUN npm ci --omit=dev

# Copia el resto del código del proyecto
COPY . .

EXPOSE 8080

CMD ["npm", "start"]