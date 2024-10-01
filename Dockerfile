FROM node:22.9.0-bullseye

WORKDIR /usr/src/app

COPY package.json .

RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD npm start
