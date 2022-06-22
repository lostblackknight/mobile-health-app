FROM node:16-alpine3.15 AS builder

ENV BASE_API_HOST=localhost
ENV BASE_API_PORT=7001
ENV NODE_ENV=production
ENV VUE_APP_BASE_API=http://${BASE_API_HOST}:${BASE_API_PORT}/api
ENV VUE_APP_BASE_WS_API=ws://${BASE_API_HOST}:${BASE_API_PORT}/api

WORKDIR /app

COPY package*.json ./

RUN npm install --registry=https://registry.npmmirror.com

COPY . ./

RUN npm run build

FROM nginx:1.21.6

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder app/dist/ /usr/share/nginx/html/
