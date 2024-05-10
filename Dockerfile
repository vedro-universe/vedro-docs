FROM node:22.1.0-alpine3.19 as builder

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn --frozen-lockfile

COPY . /app
RUN yarn build

FROM nginx:1.25.5-alpine3.19

COPY --from=builder /app/build /srv/public

COPY nginx.conf /etc/nginx/conf.d/default.conf
