# Используем официальный образ Node.js
FROM node:22

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем только package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Компиляция TS в JS
RUN npm run build

# Проверяем, создана ли папка dist
RUN ls -la && ls -la src && cat tsconfig.json && cat tsconfig.build.json

# Открываем порт
EXPOSE 4000

# Запускаем приложение
CMD ["npm", "run", "start:dev"]