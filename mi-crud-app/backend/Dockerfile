# Imagen base
FROM node:18

# Establecer directorio de trabajo
WORKDIR /app

# Copiar solo los archivos de dependencias primero
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto 8080
EXPOSE 8080

# Comando para iniciar el backend
CMD ["npm", "run", "start"]
