# Etapa de construcción
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  # Este comando genera la carpeta /app/build

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos construidos al servidor NGINX
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]