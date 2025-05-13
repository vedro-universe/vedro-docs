FROM node:23.10.0 AS builder

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn --frozen-lockfile

COPY . /app
RUN yarn build

FROM nginx:1.27.5-alpine3.21

COPY --from=builder /app/build /srv/public

COPY nginx.conf /etc/nginx/conf.d/default.conf
