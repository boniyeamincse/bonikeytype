# ⚙️ Backend API

## Base URL

```
http://localhost:3000/api
```

---

## Authentication

All protected routes require a JWT in the `Authorization` header:

```
Authorization: Bearer <token>
```

Tokens are issued on login and expire after **7 days**.

---

## Endpoints

### Auth

#### `POST /auth/register`
Register a new user.

**Body:**
```json
{
  "name": "Boni",
  "email": "boni@example.com",
  "password": "securepassword"
}
```

**Response `201`:**
```json
{
  "token": "eyJhbGci...",
  "user": { "id": 1, "name": "Boni", "email": "boni@example.com" }
}
```

---

#### `POST /auth/login`
Login with email and password.

**Body:**
```json
{
  "email": "boni@example.com",
  "password": "securepassword"
}
```

**Response `200`:**
```json
{
  "token": "eyJhbGci...",
  "user": { "id": 1, "name": "Boni" }
}
```

---

### User

#### `GET /user/profile` 🔒
Returns the authenticated user's profile and aggregate stats.

**Response `200`:**
```json
{
  "id": 1,
  "name": "Boni",
  "email": "boni@example.com",
  "stats": {
    "total_tests": 42,
    "best_wpm": 118,
    "avg_wpm": 94,
    "avg_accuracy": 97.4
  }
}
```

---

### Typing

#### `POST /typing` 🔒
Save a completed typing test result.

**Body:**
```json
{
  "wpm": 105,
  "accuracy": 98.2,
  "errors": 3,
  "mode": "timer",
  "language": "english"
}
```

**Response `201`:**
```json
{
  "id": 88,
  "message": "Test saved successfully"
}
```

---

#### `GET /typing/history` 🔒
Returns paginated test history for the authenticated user.

**Query Params:**
```
?page=1&limit=20&mode=timer
```

---

### Leaderboard

#### `GET /leaderboard`
Fetch the global leaderboard.

**Query Params:**
```
?type=global|daily|friends&limit=50
```

**Response `200`:**
```json
[
  { "rank": 1, "user": "speedster99", "best_wpm": 180, "accuracy": 99.1 },
  { "rank": 2, "user": "Boni", "best_wpm": 118, "accuracy": 97.4 }
]
```

---

### Quotes

#### `GET /quotes`
Fetch a random quote for the typing test.

**Query Params:**
```
?language=english&length=short|medium|long
```

**Response `200`:**
```json
{
  "id": 12,
  "text": "The quick brown fox jumps over the lazy dog.",
  "author": "Unknown",
  "language": "english"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Descriptive message here"
}
```

| Status | Meaning |
|---|---|
| 400 | Validation error / bad request |
| 401 | Unauthorized — missing or invalid token |
| 403 | Forbidden — insufficient permissions |
| 404 | Resource not found |
| 500 | Internal server error |

---

## Middleware

### `authMiddleware.js`
Verifies JWT token on protected routes. Attaches `req.user` with `{ id, email }` if valid.

### Input Validation
All POST routes validate body with `express-validator` before reaching the controller.
