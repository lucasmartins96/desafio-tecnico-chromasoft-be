FROM node:23

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["sh", "-c", "npm run migrate:dev && npm run start:dev"]
