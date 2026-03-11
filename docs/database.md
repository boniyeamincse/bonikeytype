# 🗄️ Database

## Overview

BoniKeytype uses **PostgreSQL** with 5 core tables. All tables include timestamp fields for audit purposes.

---

## Schema

### `users`
Stores registered user accounts.

```sql
CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,           -- bcrypt hash
  created_at  TIMESTAMP DEFAULT NOW()
);
```

---

### `typing_tests`
Records each completed typing test.

```sql
CREATE TABLE typing_tests (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
  wpm         INTEGER NOT NULL,
  accuracy    DECIMAL(5,2) NOT NULL,           -- e.g. 97.45
  errors      INTEGER DEFAULT 0,
  mode        VARCHAR(50) NOT NULL,            -- timer | words | quote | custom
  language    VARCHAR(50) DEFAULT 'english',
  created_at  TIMESTAMP DEFAULT NOW()
);
```

**Indexes:**
```sql
CREATE INDEX idx_typing_tests_user_id ON typing_tests(user_id);
CREATE INDEX idx_typing_tests_created_at ON typing_tests(created_at);
```

---

### `leaderboard`
Maintains the best WPM per user for fast leaderboard queries.

```sql
CREATE TABLE leaderboard (
  id        SERIAL PRIMARY KEY,
  user_id   INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  best_wpm  INTEGER NOT NULL DEFAULT 0,
  rank      INTEGER,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

> **Note:** `rank` is recalculated via a scheduled job or on each new best WPM submission. For real-time rank, use `RANK() OVER (ORDER BY best_wpm DESC)` in a view.

---

### `quotes`
Stores the quote library for quote mode.

```sql
CREATE TABLE quotes (
  id        SERIAL PRIMARY KEY,
  text      TEXT NOT NULL,
  author    VARCHAR(150),
  language  VARCHAR(50) DEFAULT 'english',
  length    VARCHAR(20)                        -- short | medium | long
);
```

---

### `multiplayer_sessions`
Records completed multiplayer race sessions.

```sql
CREATE TABLE multiplayer_sessions (
  session_id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_ids    INTEGER[] NOT NULL,              -- array of participant user IDs
  start_time  TIMESTAMP NOT NULL,
  end_time    TIMESTAMP,
  results     JSONB                            -- { user_id: { wpm, accuracy, rank } }
);
```

**Example `results` JSONB:**
```json
{
  "1": { "wpm": 105, "accuracy": 97.2, "rank": 1 },
  "7": { "wpm": 88,  "accuracy": 99.0, "rank": 2 }
}
```

---

## Relationships Diagram

```
users (1) ──────────< typing_tests (many)
users (1) ──────────── leaderboard (1)
users (1) ──────────< multiplayer_sessions (many-to-many via user_ids[])
```

---

## Useful Queries

### Get top 50 global leaderboard
```sql
SELECT u.name, l.best_wpm,
       RANK() OVER (ORDER BY l.best_wpm DESC) AS rank
FROM leaderboard l
JOIN users u ON u.id = l.user_id
ORDER BY l.best_wpm DESC
LIMIT 50;
```

### Get user's average WPM over last 30 days
```sql
SELECT AVG(wpm)::INTEGER AS avg_wpm
FROM typing_tests
WHERE user_id = $1
  AND created_at >= NOW() - INTERVAL '30 days';
```

### Update leaderboard after a new test
```sql
INSERT INTO leaderboard (user_id, best_wpm)
VALUES ($1, $2)
ON CONFLICT (user_id)
DO UPDATE SET best_wpm = GREATEST(leaderboard.best_wpm, EXCLUDED.best_wpm),
              updated_at = NOW();
```

---

## Initial Setup

```sql
CREATE DATABASE bonikeytype;
\c bonikeytype
-- Run migration files in /backend/db/migrations/
```
