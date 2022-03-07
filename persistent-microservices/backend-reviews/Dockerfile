FROM node:17.1-alpine3.12

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# Create app directory
WORKDIR /home/node/app

#Define las variables de ambiente
ENV RABBITMQ_HOST=rabbitmq

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

USER node

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . .

EXPOSE 3000
CMD [ "node", "consumer.js" ]