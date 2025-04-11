# Specify a base image
FROM crystallang/crystal:1.8-alpine

WORKDIR /usr/app

COPY ./shard.* ./
RUN shards install
COPY ./ ./
RUN shards build
RUN apk update && apk add postgresql postgresql-contrib

CMD ["./bin/sample"]
