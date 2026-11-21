FROM --platform=$BUILDPLATFORM node:24.22.3 AS builder

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn --frozen-lockfile

COPY . /app
RUN yarn build:index-css
RUN yarn build

FROM nginx:1.30.7-alpine3.24

COPY --from=builder /app/build /srv/public

COPY nginx.conf /etc/nginx/conf.d/default.conf
