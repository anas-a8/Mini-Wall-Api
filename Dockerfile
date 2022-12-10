FROM alpine
# install npm dependencies and pm2
RUN apk add --update nodejs npm
# copy all our source code into the working directory
COPY . /src
# define working directory for docker
WORKDIR /src
# expose port 3000 for our server to run on
EXPOSE 3000
#to start our server
ENTRYPOINT ["node", "./app.js"]
