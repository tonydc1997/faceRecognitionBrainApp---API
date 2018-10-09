FROM node:10.11.0-jessie

WORKDIR usr/src/smartbrain-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]
