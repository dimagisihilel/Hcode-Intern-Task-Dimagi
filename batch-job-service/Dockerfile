# Use Node.js 22 base image
FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4002

CMD ["npm", "run", "dev"]
