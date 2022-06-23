#!/usr/bin/env sh

find '/usr/share/nginx/html' -name '*.js' -exec sed -i \
  -e "s/BASE_API_HOST/$BASE_API_HOST/g" \
  -e "/BASE_API_PORT/$BASE_API_PORT/g" \
  -e "/BASE_API_PROTOCOL/$BASE_API_PROTOCOL/g" \
  {} \;

nginx -g "damon off;"
