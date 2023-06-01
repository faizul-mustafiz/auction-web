# Node alpine image for building and gave an aliace builder
FROM node:18-alpine AS builder
# pass the environment variable as an build argument
ARG ENVIRONMENT

WORKDIR /app
# copy the package.json and package-lock.json for caching
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-$ENVIRONMENT

# now run the nginx:alpine server with build files from builder
FROM nginx:alpine AS server

COPY --from=builder ./app/build /usr/share/nginx/html

EXPOSE 80