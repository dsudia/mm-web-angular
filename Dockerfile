FROM node:6.11.0

ENV HTTP_PORT 80
ENV HTTPS_PORT 443
ENV NODE_ENV production

EXPOSE 80
EXPOSE 443

COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm config set registry http://repo.fanaticslabs.com/artifactory/api/npm/all-npm-repos
RUN npm i -g node-gyp && node-gyp clean && npm cache clean
RUN npm i

COPY dist dist

CMD node dist/index
