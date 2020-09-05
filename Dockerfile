FROM node:latest

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install -g serve

CMD serve -s /usr/src/app/src