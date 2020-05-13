#!/bin/sh

API="http://localhost:4741"
URL_PATH="/reviews"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "restaurant": {
      "id": "'"${RID}"'"
    }
  }'
echo
