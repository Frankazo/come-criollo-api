
### Resource: Review
### Catalog of Routes

Verb         |	URI Pattern
------------ | -------------
GET | /reviews
GET | /reviews/:id
POST | /reviews
PATCH | /reviews/:id
DELETE | /reviews/:id

#### GET /reviews

Request:

```sh
curl "http://localhost:4741/reviews" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

```

```sh
TOKEN=aa2cd6b7f4457b9502adaae55e48961c sh curl-scripts/reviews/index.sh
```

Response:

```md
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:7165
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 437
ETag: W/"1b5-0EuaT0I8PY0AmhnKK9MopwAcqjQ"
Date: Mon, 11 May 2020 18:16:34 GMT
Connection: keep-alive

{
  "reviews":[
    {
      "_id":"5eb9926afcd53d2f5bea08d7",
      "text":"test text review",
      "title":"test title review",
      "owner":"5eb9853ad6940628c721f99b",
      "createdAt":"2020-05-11T17:59:06.152Z",
      "updatedAt":"2020-05-11T17:59:06.152Z",
      "__v":0
    },
    {
      "_id":"5eb99668a8e7022ffe87b42f",
      "text":"test text 2 review",
      "title":"test title 2 review",
      "rating": "5"
      "owner":"5eb9853ad6940628c721f99b",
      "createdAt":"2020-05-11T18:16:08.388Z",
      "updatedAt":"2020-05-11T18:16:08.388Z",
      "__v":0
    }
  ]
}
```

#### GET /reviews/:id

Request:

```sh
curl "http://localhost:4741/reviews/:id" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

```

```sh
TOKEN=aa2cd6b7f4457b9502adaae55e48961c ID=5eb99668a8e7022ffe87b42f sh curl-scripts/reviews/show.sh
```

Response:

```md
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:7165
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 224
ETag: W/"e0-7RyODbPp0dshZZbFkSO/2jcCw7w"
Date: Mon, 11 May 2020 18:29:14 GMT
Connection: keep-alive

{
  "review":
    {
      "_id":"5eb99668a8e7022ffe87b42f",
      "text":"test text 2 review",
      "title":"test title 2 review",
      "rating": "5"
      "owner":"5eb9853ad6940628c721f99b",
      "createdAt":"2020-05-11T18:16:08.388Z",
      "updatedAt":"2020-05-11T18:16:08.388Z",
      "__v":0
    }
}
```
#### POST /reviews

Request:

```sh
curl "http://localhost:4741/reviews" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "review": {
      "text": "'"${TEXT}"'",
      "title": "'"${TITLE}"'",
      "rating": "'"${RAT}"'"
    }
  }'
```

```sh
TOKEN=aa2cd6b7f4457b9502adaae55e48961c TEXT="Example Text" TITLE="Example Title" RAT=5 sh curl-scripts/reviews/create.sh
```

Response:

```md
HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:7165
Vary: Origin
Content-Type: application/json; charset=utf-8
Content-Length: 224
ETag: W/"e0-7RyODbPp0dshZZbFkSO/2jcCw7w"
Date: Mon, 11 May 2020 18:16:08 GMT
Connection: keep-alive

{
  "review": {
    "_id":"5eb99668a8e7022ffe87b42f",
    "text":"test text 2 review",
    "title":"test title 2 review",
    "rating": "5"
    "owner":"5eb9853ad6940628c721f99b",
    "createdAt":"2020-05-11T18:16:08.388Z",
    "updatedAt":"2020-05-11T18:16:08.388Z",
    "__v":0}
}
```

#### PATCH /reviews/:id

Request:

```sh
curl "http://localhost:4741/reviews/:id" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "review": {
      "text": "'"${TEXT}"'",
      "title": "'"${TITLE}"'",
      "rating": "'"${RAT}"'"
    }
  }'
```

```sh
TOKEN=aa2cd6b7f4457b9502adaae55e48961c ID=5eb99668a8e7022ffe87b42f TEXT="Example Text" TITLE="Example Title" RAT=5 sh curl-scripts/reviews/update.sh
```

Response:

```md
HTTP/1.1 204 No Content
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:7165
Vary: Origin
ETag: W/"a-bAsFyilMr4Ra1hIU5PyoyFRunpI"
Date: Mon, 11 May 2020 18:18:42 GMT
Connection: keep-alive
```

#### DELETE /reviews/:id

Request:

```sh
curl "http://localhost:4741/reviews/:id" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

```

```sh
TOKEN=aa2cd6b7f4457b9502adaae55e48961c ID=5eb9926afcd53d2f5bea08d7 sh curl-scripts/reviews/destroy.sh
```

Response:

```md
HTTP/1.1 204 No Content
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:7165
Vary: Origin
ETag: W/"a-bAsFyilMr4Ra1hIU5PyoyFRunpI"
Date: Mon, 11 May 2020 18:19:17 GMT
Connection: keep-alive
```
