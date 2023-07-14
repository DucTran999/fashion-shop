#! /bin/bash

# This is a script for setting up the project.

# Create .env file
cp -n ./server/.env.example ./server/.env
cp -n ./client/.env.example ./client/.env
cp -n ./admin/.env.example ./admin/.env

# find docker version
version=$(docker -v | grep "Docker version")

if [ -z "$version" ]
then
    echo ">>> Please install docker first!"
else
    read -p ">>> Are you filled out all missing field in .env file? [y/n] " \
        confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1
    cd server && docker-compose up -d
    cd ../client && docker-compose up -d
    cd ../admin && docker-compose up -d
    echo ">>> Default settings:"
    echo "::: server app live on http://localhost:8080"
    echo "::: client app live on http://localhost:14563"
    echo "::: admin  app live on http://localhost:14682"
fi