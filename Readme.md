# Contact Details

```
Name: SHAIK RAHUL
MOBILE NUMBER: 7995349819
MAIL ID:shaikrahul1105@gmail.com
```

# REST API application

## Install

    npm install

## Run the app

    npm run dev

# REST API

## Register the USer

### Request

`POST /register/`

    http://localhost:8000/register/

### Response

```json
{
  "status": 201,
  "data": {
    "_id": "60f28c2d0ebfe4214476b92b",
    "username": "example_user",
    "email": "example@example.com",
    "fullname": "Example User",
    "__v": 0
  },
  "message": "User Creates Successfully"
}
```

### Possible Errors:

1. **400 Bad Request**

   - **Description**: Indicates that some or all of the required fields are missing in the request body.
   - **Response**: `Please fill all the fields`

2. **400 Bad Request**

   - **Description**: Indicates that a user with the provided username or email already exists in the database.
   - **Response**: `User already exists`

3. **500 Internal Server Error**
   - **Description**: Indicates an unexpected error occurred while creating the user.
   - **Response**: `Internal Server Error`

## LOGIN THE USER

### Request

`POST /login/`

    http://localhost:8000/login

### Response

```json
{
  "status": 200,
  "data": {
    "user": {
      "_id": "60f28c2d0ebfe4214476b92b",
      "username": "example_user",
      "email": "example@example.com",
      "fullname": "Example User",
      "__v": 0
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User logged In Successfully"
}
```

### Possible Errors:

1. **400 Bad Request**

   - **Description**: Indicates that both username and email are missing in the request body.
   - **Response**: `username or email is required`

2. **404 Not Found**

   - **Description**: Indicates that no user with the provided username or email exists in the database.
   - **Response**: `User does not exist`

3. **401 Unauthorized**

   - **Description**: Indicates that the provided password is incorrect.
   - **Response**: `Invalid user credentials`

4. **500 Internal Server Error**
   - **Description**: Indicates an unexpected error occurred while processing the login request.
   - **Response**: `Internal Server Error`

## LogOut

### Request

`POST /logout`

    http://localhost:8000/logout

### Response

```json
{
  "status": 200,
  "data": {},
  "message": "User logged Out"
}
```

## FIleUpload

### Request

`POST /fieupload`

     http://localhost:8000/fileupload

### Sample Response:

```json
{
  "status": 200,
  "data": {
    "_id": "6090e1a36b8e840015eeecae",
    "file": "https://cloudinary.com/example_file.jpg",
    "__v": 0
  },
  "message": "File Uploaded Successfully"
}
```

## Vader

### Request

`POST /analyze`

     http://localhost:8000/analyze

### Response

```json
{
  "text": "I love the weather today!"
}
{
  "sentiment": "positive",
  "score": 0.6369
}
```

## AUTHENTICATION

### INCLUDED all the authentication in user.model.js

please read it using "bcrypt-hashing" and JSONWEBTOKENS

## MIDDLEWARE

### FOR Authorization and FOR MULTER

### THIRD PARTY

### Cloudinary for file upload- limited only for 50MB

## PLEASE GO THROUGH THE CODE , you will understand how potential player I AM
