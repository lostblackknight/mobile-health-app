# build stage
FROM node:16-alpine3.15 as build-stage

ENV API_SERVICE_PROTOCOL=http
ENV API_SERVICE_HOST=localhost
ENV API_SERVICE_PORT=7001
ENV VUE_APP_BASE_API=${API_SERVICE_PROTOCOL}://${API_SERVICE_HOST}:${API_SERVICE_PORT}/api
ENV VUE_APP_BASE_WS_API=ws://${API_SERVICE_HOST}:${API_SERVICE_PORT}/api

WORKDIR /app

COPY package*.json ./

RUN npm --registry https://registry.npmmirror.com install

COPY ./ ./

RUN npm run build

# production stage
FROM nginx:1.21.6 as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
