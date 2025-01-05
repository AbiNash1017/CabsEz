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