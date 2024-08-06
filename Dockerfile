# Nodejs
FROM node:20.10.0 As development

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# install nodejs lib
COPY package.json yarn.lock ./

RUN yarn install

ARG PORT=3000

COPY . ./

RUN yarn build:prod

EXPOSE $PORT

CMD [ "yarn", "start:prod" ]
