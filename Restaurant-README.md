
### Resource: Review
### Catalog of Routes

Verb         |	URI Pattern
------------ | -------------
GET | /restaurant
GET | /restaurant/:id
POST | /restaurant
PATCH | /restaurant/:id
DELETE | /restaurant/:id

#### GET /restaurant

Request:

```sh
curl "http://localhost:4741/restaurant" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}" \
```

```sh
TOKEN=<Token> RID=<restaurant _id> sh curl-scripts/restaurant/index.sh
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
    "restaurant": [
        {
            "_id": "5ebc598afbcd1f32c27acd83",
            "ownerName": "Frankazo",
            "restName": "El chiringuito",
            "description": "The best Place in Earth",
            "email": "Frankazo@criollo.com",
            "location": "Cruzas a la esquina y lo ves",
            "website": "frankazo.github.io",
            "phone": 23223234,
            "rating": 5,
            "owner": "5eb9853ad6940628c721f99b",
            "reviews": [
                {
                    "_id": "5ebc59c1fbcd1f32c27acd84",
                    "text": "This is the best place",
                    "title": "I love it",
                    "rating": 5,
                    "restaurant": "5ebc598afbcd1f32c27acd83",
                    "owner": "5eb9853ad6940628c721f99b",
                    "createdAt": "2020-05-13T20:34:09.685Z",
                    "updatedAt": "2020-05-13T20:34:09.685Z"
                }
            ],
            "createdAt": "2020-05-13T20:33:14.333Z",
            "updatedAt": "2020-05-13T20:34:09.686Z",
            "__v": 1
        }
    ]
}
```

#### GET /restaurant/:id

Request:

```sh
curl "http://localhost:4741/restaurant/:id" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"
```

```sh
TOKEN=<Token> ID=<Review _id> sh curl-scripts/restaurant/show.sh
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
    "restaurant": {
        "_id": "5ebc598afbcd1f32c27acd83",
        "ownerName": "Frankazo",
        "restName": "El chiringuito",
        "description": "The best Place in Earth",
        "email": "Frankazo@criollo.com",
        "location": "Cruzas a la esquina y lo ves",
        "website": "frankazo.github.io",
        "phone": 23223234,
        "rating": 5,
        "owner": "5eb9853ad6940628c721f99b",
        "reviews": [
            {
                "_id": "5ebc59c1fbcd1f32c27acd84",
                "text": "This is the best place",
                "title": "I love it",
                "rating": 5,
                "restaurant": "5ebc598afbcd1f32c27acd83",
                "owner": "5eb9853ad6940628c721f99b",
                "createdAt": "2020-05-13T20:34:09.685Z",
                "updatedAt": "2020-05-13T20:34:09.685Z"
            }
        ],
        "createdAt": "2020-05-13T20:33:14.333Z",
        "updatedAt": "2020-05-13T20:34:09.686Z",
        "__v": 1
    }
}
```
#### POST /restaurant

Request:

```sh
curl "http://localhost:4741/restaurant" \
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
```

```sh
TOKEN=<Token> ON="Example" RN="Example" D="Example" E="Example" L="Example" W="Example" P=123123123 R=5 sh curl-scripts/restaurant/create.sh
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
    "restaurant": {
        "_id": "5ebc61c1fbcd1f32c27acd85",
        "ownerName": "Example,
        "restName": "Example",
        "description": "Example",
        "email": "Example",
        "location": "Example",
        "website": "Example",
        "phone": 123123123,
        "rating": 5,
        "owner": "5eb9853ad6940628c721f99b",
        "reviews": [],
        "createdAt": "2020-05-13T21:08:17.787Z",
        "updatedAt": "2020-05-13T21:08:17.787Z",
        "__v": 0
    }
}
```

#### PATCH /restaurant/:id

Request:

```sh
curl "http://localhost:4741/restaurant/:id" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "restaurant": {
      "ownerName": "'"${ON}"'",
      "restName": "'"${RN}"'"
    }
  }'
```

```sh
TOKEN=<Token> ID=<ID> ownerName="Example Text" restName="Example Text" sh curl-scripts/restaurant/update.sh
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

#### DELETE /restaurant/:id

Request:

```sh
curl "http://localhost:4741/restaurant/:id" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"
```

```sh
TOKEN=<Token> ID=<ID> sh curl-scripts/restaurant/destroy.sh
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
