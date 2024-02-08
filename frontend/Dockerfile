FROM node:18-alpine as node-alpine
RUN apk --no-cache add tzdata
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build:production

FROM nginx:1-alpine
COPY --from=node-alpine /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=node-alpine /app/build /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

EXPOSE 80

ENV TZ=America/Sao_Paulo
ENV BACKEND_API=http://host.docker.internal:8080/api
ENV DOLLAR="$"

CMD /bin/ash -c "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"