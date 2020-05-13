#!/bin/bash

API="http://localhost:4741"
URL_PATH="/restaurant"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "restaurant": {
      "ownerName": "'"${ON}"'",
      "restName": "'"${RN}"'",
      "description": "'"${D}"'",
      "email": "'"${E}"'",
      "location": "'"${L}"'",
      "website": "'"${W}"'",
      "phone": "'"${P}"'",
      "rating": "'"${R}"'"
    }
  }'

echo
