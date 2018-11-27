FROM node:8 as build
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
COPY . ./
RUN npm run build 
