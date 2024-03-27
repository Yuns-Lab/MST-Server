FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 6001

CMD [ "node", "index.js" ]