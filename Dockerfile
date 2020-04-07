FROM node:latest

WORKDIR /usr/src/smartBrain-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]
