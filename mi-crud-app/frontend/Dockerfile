# Etapa de construcción
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar archivos construidos al servidor NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración NGINX opcional (si tienes)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
