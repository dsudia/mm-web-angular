FROM node:6.11.0-alpine

ENV HTTP_PORT 80
ENV NODE_ENV production

EXPOSE 80

COPY dist dist

CMD node dist/main.bundle
