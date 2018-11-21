FROM node:8 as build
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run build

FROM nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
