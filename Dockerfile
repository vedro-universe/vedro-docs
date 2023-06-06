FROM node:20.2.0-alpine3.17 as builder

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn --frozen-lockfile

COPY . /app
RUN yarn build

FROM nginx:1.21.6-alpine

COPY --from=builder /app/build /srv/public

COPY nginx.conf /etc/nginx/conf.d/default.conf
