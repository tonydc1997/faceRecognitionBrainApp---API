FROM node:10.11.0-jessie

WORKDIR usr/src/smartBrain-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]
