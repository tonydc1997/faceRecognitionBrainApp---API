FROM node:10.11.0-jessie

WORKDIR usr/src/smartBrain-api

COPY ./ ./

CMD ["/bin/bash"]
