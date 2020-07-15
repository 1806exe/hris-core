FROM node:12.18-alpine3.12
RUN mkdir /home/app
WORKDIR /home/app
COPY package.json /home/app/package.json
RUN npm install
COPY ["nodemon.json", "nodemon-debug.json", "ormconfig.json", "tsconfig.json", "tsconfig.build.json", "tslint.json", "./"]
CMD npm run start