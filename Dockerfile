FROM node:6.11.0-alpine

ENV HTTP_PORT 80
ENV HTTPS_PORT 443
ENV NODE_ENV production

EXPOSE 80
EXPOSE 443

COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install --production=true

COPY dist dist

CMD node dist/index
