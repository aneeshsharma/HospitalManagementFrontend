FROM node:alpine

WORKDIR /app
ENV PORT 80
ENV APP_HOME /app

COPY . /app

RUN npm install
RUN npm run build
RUN npm install -g serve

EXPOSE $PORT

CMD serve -p $PORT -s build
