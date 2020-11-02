# Базовый слой
FROM node:13

# рабочая папка
WORKDIR /tmp
# Копируем все файлы за исключением тех, которые в игноре
COPY . /tmp
# Устанавливаем зависимости, в образе появится /node_modules
# Устанавливаем registry для ускорения установки
RUN npm config set registry http://registry.npmjs.org/ && npm ci
# сборка приложения
RUN npm run build

# Переносим нужные файлы в папку, откуда будем запускать приложение
WORKDIR /app

COPY . /app
COPY package.json /app
RUN cp -a /tmp/node_modules /app
RUN cp -a /tmp/server /app
RUN cp -a /tmp/dist /app

# сетапим перемнные окружения, которые понадобятся в сервере
ENV NODE_ENV=production
ENV PORT=80

# При старте контейнер начнёт общаться через 80 порт
EXPOSE 80

# Сервер раздаёт статику из dist
CMD npm run start:prod