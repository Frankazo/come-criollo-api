#!/bin/bash

API="http://localhost:4741"
URL_PATH="/reviews"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "review": {
      "text": "'"${TEXT}"'",
      "title": "'"${TITLE}"'",
      "rating": "'"${RAT}"'",
      "restaurant": "'"${RID}"'"
    }
  }'

echo
