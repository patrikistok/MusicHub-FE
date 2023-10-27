FROM node:18-alpine

WORKDIR /music-hub-frontend/

COPY . .

RUN npm install

CMD ["npm", "start"]