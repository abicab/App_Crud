# Imagen base
FROM node:18

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY package*.json ./
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto (ajusta según tu app)
EXPOSE 3000

# Comando para iniciar el backend
CMD ["npm", "run", "start"]
