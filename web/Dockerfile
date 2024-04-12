# build stage
FROM node:lts-alpine3.19 as build-stage
RUN yarn config set registry https://api-web-registry.metaapp.cn/
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
# ARG Env
# RUN yarn docker:build:${Env}
RUN yarn docker:build


# production stage
FROM nginx:stable-alpine as production-stage
RUN echo -e  "https://mirrors.aliyun.com/alpine/v3.14/main" > /etc/apk/repositories
RUN apk add nodejs
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/bin /usr/share/node/
COPY --from=build-stage /app/dist /usr/share/nginx/html/
EXPOSE 80
CMD nginx && node /usr/share/node/node