FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN rm -rf node_modules

RUN npm install

EXPOSE 3000