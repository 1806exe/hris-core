FROM node:12.18-alpine3.12
RUN mkdir /home/app
WORKDIR /home/app
CMD npm run start:dev