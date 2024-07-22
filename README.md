# Express.js And MongoDB REST API

## Install

    root > npm install

## Run a project in development mode

    root > npm run dev

## Run a project in production mode

    root > npm run build
    root > npm start

# REST API example application

The REST API to the example app is described below.

## Get root

### Request

`GET /`

    curl -i -H 'Accept: application/json' http://localhost:5000

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    { "message": "RESTful services it's working!" }

## Get a Product List

### Request

`GET /api/product`

    curl -i -H 'Accept: application/json' http://localhost:5000/api/product

### Response

    HTTP/1.1 201 Created
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    [ { ... }, { ... }, { ... } ]

## Get a specific Product

### Request

`GET /api/product/:productId`

    curl -i -H 'Accept: application/json' http://localhost:5000/api/product/660adcc629cdc201eca6f073

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    { ... }

## Get a non-existent Product

### Request

`GET /api/product/alabala`

    curl -i -H 'Accept: application/json' http://localhost:5000/api/product/alabala

### Response

    HTTP/1.1 404 Not Found
    Status: 404 Not Found
    Connection: close
    Content-Type: application/json

    { "message": "Product not found" }

## Create another new Product

### Request

`POST /api/product`

    curl -i -H 'Accept: application/json, X-Authorization: {token}' -d { ... } http://localhost:5000/api/product

### Response

    HTTP/1.1 200 OK
    Status: 201 OK
    Connection: close
    Content-Type: application/json

    { ... }

## Change a Product's state

### Request

`PUT /api/product/:productId`

    curl -i -H 'Accept: application/json, X-Authorization: {token}' -d {...} -X PUT http://localhost:5000/api/product/660adcc629cdc201eca6f073

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    { ... }

## Get a Product Pagination

### Request

`GET /api/product/:limit/limit/:page/page`

    curl -i -H 'Accept: application/json' http://localhost:5000/api/product/4/limit/3/page

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    { ... }

## Delete a Product

### Request

`DELETE /api/product/:productId`

    curl -i -H 'Accept: application/json, X-Authorization: {token}' -X DELETE http://localhost:5000/api/product/660adcc629cdc201eca6f073

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    { ... }

## Create a User

### Request

`POST /api/users/register`

    curl -i -H 'Accept: application/json' http://localhost:5000/api/users/register

### Response

    HTTP/1.1 200 OK
    Status: 201 OK
    Connection: close
    Content-Type: application/json

    { ... }

## Login a User

### Request

`POST /api/users/login`

    curl -i -H 'Accept: application/json' http://localhost:5000/api/users/login

### Response

    HTTP/1.1 200 OK
    Status: 201 OK
    Connection: close
    Content-Type: application/json

    { ... }

## Profile info

### Request

`GET /api/users/profile`

    curl -i -H 'Accept: application/json', X-Authorization: {token}' http://localhost:5000/api/users/profile

### Response

    HTTP/1.1 200 OK
    Status: 201 OK
    Connection: close
    Content-Type: application/json

    { ... }

## Logout a User

### Request

`GET /api/users/logout`

    curl -i -H 'Accept: application/json' http://localhost:5000/api/users/logout

### Response

    HTTP/1.1 200 OK
    Status: 204 OK
    Connection: close
    Content-Type: application/json

    No response body!
