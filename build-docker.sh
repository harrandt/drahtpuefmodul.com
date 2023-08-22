#!/bin/bash

APP=${1:?"Which App?"}
TAG=${2:-latest}

docker build --build-arg APP="$APP" . -t "$APP:$TAG"
