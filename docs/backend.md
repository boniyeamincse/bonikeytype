# ⚙️ Backend API

## Base URL

```
http://localhost:5000/api
```

---

## Authentication

All protected routes require a JWT in the `Authorization` header:

```
Authorization: Bearer <token>
```

Tokens are issued on login and expire after **24 hours**.

---

## Endpoints

### Auth

#### `POST /auth/register`
Register a new user.

**Body:**
```json
{
  "username": "Boni",
  "email": "boni@example.com",
  "password": "securepassword"
}
```

**Response `201`:**
```json
{
  "token": "eyJhbGci...",
  "user": { "id": 1, "username": "Boni", "email": "boni@example.com" }
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

#### `GET /auth/me` 🔒
Returns the authenticated user's profile and current level/xp.

**Response `200`:**
```json
{
  "id": 1,
  "username": "Boni",
  "email": "boni@example.com",
  "level": 1,
  "xp": 150
}
```

---

### Typing

#### `POST /stats/save` 🔒
Save a completed typing test result.

**Body:**
```json
{
  "wpm": 105,
  "accuracy": 98.2,
  "mode": "timer",
  "modeValue": "60"
}
```

**Response `201`:**
```json
{
  "message": "Test result saved successfully",
  "xpGained": 85,
  "levelUp": false
}
```

---

#### `GET /stats/history` 🔒
Returns test history for the authenticated user.

**Response `200`:**
```json
[
  { "wpm": 85, "accuracy": 98, "mode": "timer", "mode_value": "30", "created_at": "..." }
]
```

---

### Leaderboard

#### `GET /stats/leaderboard`
Fetch the all-time global leaderboard.

**Response `200`:**
```json
[
  { "username": "speedster99", "best_wpm": 180 },
  { "username": "Boni", "best_wpm": 118 }
]
```

---

### Quotes

#### `GET /quotes/random`
Fetch a random quote for the typing test.

**Response `200`:**
```json
{
  "id": 12,
  "text": "The quick brown fox jumps over the lazy dog.",
  "author": "Unknown"
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
