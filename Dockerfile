FROM node:18-alpine AS base

WORKDIR /app

FROM base AS dev

CMD ["yarn", "serve"]

FROM base as prod

COPY . ./

ENV IS_PROD=true

RUN \
  yarn &&\
  yarn build

CMD ["yarn", "start"]