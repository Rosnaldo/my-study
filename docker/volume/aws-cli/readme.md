docker run --entrypoint "" -it -v $HOME/.aws:/root/.aws amazon/aws-cli sh
# copy aws credentials to container