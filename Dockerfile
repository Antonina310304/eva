FROM node:14-alpine AS build
WORKDIR /app

# Инструмент для удаления ненужных файлов из node_modules, таких как markdown-файлы, .d.ts и прочих
RUN apk update \
    && apk add curl \
    && curl -sf https://gobinaries.com/tj/node-prune | sh \
    && rm -rf /var/lib/apt/lists/*

# Настраиваем работу с NPM
ARG NPM_REGISTRY
ARG NPM_TOKEN
ENV NPM_REGISTRY ${NPM_REGISTRY:-}
ENV NPM_TOKEN ${NPM_TOKEN:-}
RUN npm config set "${NPM_REGISTRY}" "${NPM_TOKEN}"

# Устанавливаем все зависимости, в том числе и dev-зависимости, которые нужны для сборки
ENV NODE_ENV=development
COPY .npmrc package*.json ./
RUN set -ex && npm ci -dd

# Собираем образ для production
COPY . .
ENV NODE_ENV=production
RUN set -ex && npm run build;

# Очищаем образ от ненужных файлов и dev-зависимостей
RUN npm prune --production
RUN node-prune
RUN rm -rf node_modules/.cache \
    && rm -rf node_modules/**/*.html \
    && rm -rf node_modules/**/*.js.map \
    && cd node_modules/@babel; ls | grep -v 'runtime' | xargs rm -rf; cd ../../ \
    && rm -rf node_modules/@types \
    && rm -rf node_modules/autoprefixer \
    && rm -rf node_modules/browserslist \
    && rm -rf node_modules/caniuse-lite \
    && rm -rf node_modules/postcss-prefix-selector \
    && rm -rf node_modules/react/*/react.development.js \
    && rm -rf node_modules/react/umd \
    && rm -rf node_modules/react-dom/umd \
    && rm -rf node_modules/react-dom/*.development.js \
    && rm -rf node_modules/react-dom/*/react-dom-unstable*

# Собираем финальный образ
FROM node:14-alpine AS release
WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-http-header-size=65536"
ENV API_PECOM="https://shipping.divan.ru/api"

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3333
CMD ["node", "./dist/server/index.js"]
