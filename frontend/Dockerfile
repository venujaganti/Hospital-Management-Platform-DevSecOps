FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM nginx:1.27-alpine

COPY --from=builder \
    /app/build \
    /usr/share/nginx/html

COPY nginx.conf.template \
    /etc/nginx/templates/default.conf.template

ENV BACKEND_HOST=backend

ENV BACKEND_PORT=5000

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]