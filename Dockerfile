# syntax=docker/dockerfile:1

FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

