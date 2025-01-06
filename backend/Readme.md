# Backend API Documentation

## User Registration API Documentation

### Overview
The User Registration API allows clients to register a new user account. Upon successful registration, the user will receive a JWT token for authentication in subsequent requests.

---

## Endpoint

- **POST** `/users/register`

---

## Request

### Headers

- **Content-Type**: `application/json`

### Body

```json
{
  "fullname": {
    "firstname": "string",  // Required, minimum 3 characters
    "lastname": "string"    // Optional, minimum 3 characters
  },
  "email": "string",        // Required, valid email format
  "password": "string"      // Required, minimum 6 characters
}
```

### Validation Rules

- **Email**: Must be a valid email format.
- **First Name**: Must be at least 3 characters long.
- **Last Name**: Optional, but if provided, must be at least 3 characters long.
- **Password**: Must be at least 6 characters long.

---

## Response

### Success Response

- **Code**: `201 CREATED`
  
```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string"         // Unique user ID
  },
  "token": "JWT_Token_String" // Authentication token
}
```

### Error Responses

#### 400 BAD REQUEST

- **Code**: `400 BAD REQUEST`
  
```json
{
  "errors": [
    {
      "msg": "Invalid Email",  // Error message
      "param": "email",        // Field causing the error
      "location": "body"       // Location of the error
    }
  ]
}
```

#### 409 CONFLICT

- **Code**: `409 CONFLICT`
  
```json
{
  "message": "Email already exists"
}
```

#### 500 INTERNAL SERVER ERROR

- **Code**: `500 INTERNAL SERVER ERROR`
  
```json
{
  "message": "Internal server error"
}
```

---

## Security

- **Password Hashing**: Passwords are hashed using bcrypt before storage.
- **JWT Token**: A JSON Web Token (JWT) is returned for authentication.
- **Email Uniqueness**: Email must be unique in the system.

---

## Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

---

## Example Success Response

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Example Error Response

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

## Additional Notes

- **Rate Limiting**: The API is rate-limited to prevent abuse.
- **Token Expiry**: The JWT token expires can be set as the desired duration by the developer. Use the `/users/login` endpoint to refresh the token.
- **Password Strength**: It is recommended to use a strong password with a mix of uppercase, lowercase, numbers, and special characters.

---

## API Usage

### Step 1: Register a User

Send a `POST` request to `/users/register` with the required fields.

### Step 2: Success Response

If successful, the API will return a `201 CREATED` response with the user details and a JWT token.

### Step 3: Authentication with JWT Token

Use the JWT token for authenticated requests by including it in the `Authorization` header:

```text
Authorization: Bearer <JWT_Token>
```

---

## Conclusion

This documentation provides a clear overview of how to use the User Registration API, including request details, validation rules, and response structures. For further assistance or issues, please reach out to the support team.

---
######
# User Login API Documentation
######

This document provides an overview of the user login functionality implemented in the provided code snippet. The API allows users to log in by validating their credentials (email and password) and returns a JSON Web Token (JWT) upon successful authentication.

---

## **API Endpoint**
**POST** `/api/users/login`

---

## **Request Body**

The request body should contain the following fields:

| Field       | Type   | Required | Description                      |
|-------------|--------|----------|----------------------------------|
| `email`     | String | Yes      | The email address of the user.  |
| `password`  | String | Yes      | The password of the user.       |

### Example Request Body

```json
{
    "email": "user@example.com",
    "password": "yourpassword123"
}
```

---

## **Response**

### **Success Response (Status Code: 200)**

On successful login, the API returns the user object and a JWT token.

#### Example Response

```json
{
    "user": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k",
        "name": "John Doe",
        "email": "user@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### **Error Responses**

#### **Validation Error (Status Code: 400)**

Occurs when the request body fails validation (e.g., missing or invalid fields).

##### Example Response

```json
{
    "errors": [
        {
            "msg": "Email is required",
            "param": "email",
            "location": "body"
        }
    ]
}
```

#### **Invalid Credentials (Status Code: 401)**

Occurs when the email or password is incorrect.

##### Example Response

```json
{
    "errors": [
        {
            "msg": "Invalid Credentials"
        }
    ]
}
```

---

## **How It Works**

1. **Validation**:
   - The request body is validated using `validationResult(req)`.
   - If there are validation errors, a `400 Bad Request` response is returned with the error details.

2. **User Lookup**:
   - The API checks if a user exists with the provided email.
   - If no user is found, a `401 Unauthorized` response is returned with the message `"Invalid Credentials"`.

3. **Password Comparison**:
   - If the user exists, the API compares the provided password with the hashed password stored in the database using the `comparePasswords` method.
   - If the passwords do not match, a `401 Unauthorized` response is returned.

4. **Token Generation**:
   - If the credentials are valid, a JWT token is generated using the `generateAuthToken` method.
   - The token and user details are returned in the response.

---

## **Dependencies**

- **Mongoose**: Used for querying the database.
- **JWT (JSON Web Token)**: Used for generating authentication tokens.
- **Express Validator**: Used for request body validation.

---

## **Example Usage**

### **Request**

```bash
curl -X POST http://localhost:3000/api/users/login \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "password": "yourpassword123"}'
```

### **Response**

```json
{
    "user": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k",
        "name": "John Doe",
        "email": "user@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## **Notes**

- Ensure that the `userModel` has the `comparePasswords` and `generateAuthToken` methods implemented.
- The API assumes that the password is stored in a hashed format in the database.
- Always use HTTPS in production to secure sensitive data like passwords and tokens.