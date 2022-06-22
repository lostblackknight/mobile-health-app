# build stage
FROM node:16-alpine3.15 as build-stage

ENV BASE_API_PROTOCOL=http
ENV BASE_API_HOST=localhost
ENV BASE_API_PORT=7001
ENV VUE_APP_BASE_API=${BASE_API_PROTOCOL}://${BASE_API_HOST}:${BASE_API_PORT}/api'
ENV VUE_APP_BASE_WS_API=ws://${BASE_API_HOST}:${BASE_API_PORT}/api'

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx:1.21.6 as production-stage

COPY --from=build-stage /app/dist /user/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
