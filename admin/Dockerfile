FROM node:18-alpine

# Create app directory
WORKDIR /usr/app/client

# Install app dependencies
COPY ./package*.json ./
COPY ./yarn.lock ./yarn.lock
RUN npm ci
RUN npm install -g serve

# Bundle app source
COPY ./src ./src
COPY ./public ./public
COPY ./.env ./.env

EXPOSE ${REACT_APP_PORT}
ENV NODE_ENV production
RUN npm run build

CMD [ "serve","-s","build" ]
