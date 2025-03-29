FROM node:lts-alpine AS build

WORKDIR /app
COPY package.json ./
RUN npm install --verbose

COPY . ./
RUN npm run build

FROM nginx:stable-alpine as prod
RUN apk add --no-cache bash
COPY nginx/*.conf /etc/nginx/conf.d/
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
