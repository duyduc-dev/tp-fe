FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV ESLINT_NO_DEV_ERRORS=true

RUN npm run build

EXPOSE 2003

CMD [ "npm", "run", "preview" ]