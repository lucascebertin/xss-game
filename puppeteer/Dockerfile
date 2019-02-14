FROM mhart/alpine-node
LABEL application=xss-game-puppeteer

ENV PORT 31337
ENV MONGO_HOST 127.0.0.1
ENV MONGO_PORT 27017
ENV MONGO_DATABASE wh00t
ENV MONGO_USERNAME wh00t
ENV MONGO_PASSWORD superduperpasswordwithsuperprotection

WORKDIR /app
RUN apk update

COPY ./wait-for.sh .
RUN chmod +x wait-for.sh

COPY ./package.json ./yarn.lock ./
RUN yarn install --emoji
COPY . ./

EXPOSE 31337

CMD ./wait-for.sh -t 30 $MONGO_HOST:$MONGO_PORT -- npx yarn start