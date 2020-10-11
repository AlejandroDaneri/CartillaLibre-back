FROM node:14-alpine

RUN mkdir -p /cartillalibre

WORKDIR /cartillalibre

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]
