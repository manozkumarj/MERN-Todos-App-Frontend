FROM node:alpine3.18 as build

# Build App
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 80
ENTRYPOINT [ "npm", "run", "dev" ]