# 🏗️ Architecture

## System Overview

BoniKeytype is a full-stack web application with a decoupled frontend and backend, connected via REST API and WebSocket for real-time features.

```
[User Browser]
     │
     ▼
[React Frontend]  ──── REST API ────▶  [Node.js / Express Backend]
     │                                          │
     └──── Socket.io (WebSocket) ──────────────┘
                                                │
                                         [PostgreSQL DB]
```

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 | UI rendering & state management |
| Styling | TailwindCSS | Utility-first responsive design |
| Routing | React Router v6 | Client-side navigation |
| HTTP Client | Axios | REST API calls |
| Real-Time | Socket.io-client | Multiplayer WebSocket connection |
| Backend | Node.js + Express | REST API server |
| Auth | JWT + bcrypt | Token-based auth, password hashing |
| Real-Time Server | Socket.io | WebSocket event handling |
| Database | PostgreSQL | Persistent data storage |
| ORM / Query | pg (node-postgres) | Raw SQL with parameterized queries |

---

## Frontend Architecture

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx          # Main typing interface
│   │   ├── Profile.jsx       # User stats & history
│   │   ├── Leaderboard.jsx   # Rankings
│   │   ├── Settings.jsx      # Theme & preferences
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── components/
│   │   ├── TypingBox.jsx     # Core typing input area
│   │   ├── Timer.jsx         # Countdown / elapsed timer
│   │   ├── StatsDisplay.jsx  # Live WPM, accuracy
│   │   ├── LeaderboardTable.jsx
│   │   └── SettingsForm.jsx
│   ├── hooks/
│   │   ├── useTypingEngine.js
│   │   └── useTimer.js
│   ├── context/
│   │   └── AuthContext.jsx
│   └── utils/
│       ├── wpmCalc.js
│       └── socket.js
```

---

## Backend Architecture

```
backend/
├── src/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   ├── typing.js
│   │   ├── leaderboard.js
│   │   └── quotes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── typingController.js
│   │   └── leaderboardController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── db/
│   │   └── pool.js
│   ├── socket/
│   │   └── multiplayerHandler.js
│   └── server.js
```

---

## Data Flow

### Typing Test (Single Player)
1. Frontend loads word list or quote from `/quotes`
2. User begins typing — engine starts tracking keystrokes
3. On test completion, stats are POST'd to `/typing`
4. Backend saves to `typing_tests` table
5. Leaderboard is updated if a new best WPM is achieved

### Multiplayer Race
1. User creates or joins a room → Socket.io event `join_room`
2. Server waits for minimum players, then emits `race_start`
3. Each keystroke emits `progress_update` to all room members
4. On finish, server records results via `race_finish` event
5. Results are persisted to `multiplayer_sessions`

---

## Security

- All passwords hashed with **bcrypt** (salt rounds: 12)
- API routes protected with **JWT middleware**
- Tokens expire after 7 days
- Input sanitized to prevent SQL injection via parameterized queries
- CORS restricted to `FRONTEND_URL` env variable
