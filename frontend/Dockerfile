FROM node:18-alpine as node-alpine
RUN apk --no-cache add tzdata
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM busybox:1.36
RUN adduser -D static
USER static
WORKDIR /home/static

COPY --from=node-alpine /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=node-alpine /app/build /home/static

EXPOSE 3000

ENV TZ=America/Sao_Paulo

CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"]
