# 1. Базовый образ Node.js для сборки приложения
FROM node:18-alpine as build

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm ci

# Копируем исходники и собираем приложение
COPY . .
RUN npm run build


# 2. Этап сервера: Nginx
FROM nginx:alpine

# Копируем сборку из предыдущего этапа в папку Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем свой конфиг nginx (опционально)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
