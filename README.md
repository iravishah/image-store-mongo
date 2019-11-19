# image-store-mongo
API to store image in mongodb

### Step 1
To install all the dependencies

``` npm install ```

### Step 2
To start the service

``` node index.js ```

### API call

### POST call to store file

```
URL : http://localhost:8888/api/photo
content-type: application/form-data
body: userPhoto: <file from your machine>
```

### GET call to retrive file

```
URL: http://localhost:8888/api/:_id
query: path: <path where you want to store file>
```