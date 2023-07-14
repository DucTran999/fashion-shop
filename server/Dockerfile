FROM node:18-alpine

# Create app directory
WORKDIR /usr/app/api

# Install app dependencies
COPY ./package*.json ./
RUN npm ci

# Bundle app source
COPY ./src ./src
COPY ./public ./public
COPY ./.env ./.env
COPY ./babel.config.json ./babel.config.json

EXPOSE ${PORT}
CMD [ "npm", "start" ]