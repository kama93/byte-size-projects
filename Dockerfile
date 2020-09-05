FROM node:latest

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install -g serve

CMD serve /usr/src/app/src