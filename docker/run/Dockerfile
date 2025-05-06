FROM node:17-alpine3.14

LABEL maintainer="mateus"

HEALTHCHECK CMD \
  curl -sf http://localhost:3000/ || exit 1

VOLUME [ "/var/nodeapp" ]

RUN adduser -h /var/nodeapp \
      -s /bin/bash \
      -D nodeapp && \
    apk add curl

WORKDIR /var/nodeapp

COPY . .
RUN chown nodeapp:nodeapp app.js

ARG VERSION
ENV VERSION=${VERSION:-1.0.0}

USER nodeapp
ENTRYPOINT [ "node" ]
CMD [ "app.js" ]