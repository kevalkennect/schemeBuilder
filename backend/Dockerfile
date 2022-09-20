# Dockerfile
FROM node:latest

# create destination directory
# RUN mkdir -p /usr/src/project
WORKDIR /usr/src/backend

# update and install dependency
# RUN apk update && apk upgrade
# RUN apk add git

# copy the app, note .dockerignore
COPY . .
RUN npm install 

EXPOSE 3001

CMD [ "npm", "run", "server" ]