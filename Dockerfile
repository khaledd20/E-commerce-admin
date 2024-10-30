#stage 1
FROM node:latest as node
WORKDIR /app
COPY . ./
RUN npm install
RUN npm install -g @angular/cli
EXPOSE 45451
CMD ng serve --host 0.0.0.0 --port 45451

