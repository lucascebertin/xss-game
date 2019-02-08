FROM mhart/alpine-node
LABEL application=ci-nodejs-docker

ENV PORT 1337
WORKDIR /app
RUN apk update

COPY app ./

RUN yarn install --emoji

EXPOSE 1337

CMD ["yarn", "start"]