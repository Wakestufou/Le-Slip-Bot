FROM node:latest

WORKDIR /slip-bot

COPY . .

RUN npm i
RUN npm run build

CMD [ "npm", "start" ]