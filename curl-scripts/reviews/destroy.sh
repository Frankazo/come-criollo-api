#!/bin/bash

API="http://localhost:4741"
URL_PATH="/reviews"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "restaurant": {
      "id": "'"${RID}"'"
    }
  }'
echo