FROM node:18.20.0

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3000

RUN npm run build

USER node

CMD ["npm","run","start"]

