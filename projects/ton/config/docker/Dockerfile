FROM node:10.15-alpine

# Create app directory
WORKDIR /challenges-api
COPY . /challenges-api
EXPOSE ${SERVER_PORT}
CMD ["npm", "run", "serve"]
