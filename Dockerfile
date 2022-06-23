# build stage
FROM node:16-alpine3.15 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm --registry https://registry.npmmirror.com install

COPY ./ ./

RUN npm run build

# production stage
FROM nginx:1.21.6 as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/replace.sh /

EXPOSE 80

CMD ["sh", "replace.sh"]
