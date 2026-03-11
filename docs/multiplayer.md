# 🏁 Multiplayer

## Overview

BoniKeytype supports real-time typing races using **Socket.io**. Multiple users can join a race room, see each other's live progress, and compare results at the end.

---

## Architecture

```
[Client A] ─── socket ───┐
[Client B] ─── socket ───┼──▶ [Socket.io Server] ──▶ [PostgreSQL]
[Client C] ─── socket ───┘
```

The Socket.io server runs on the same Node.js backend server. All race state is managed in memory during the session, then persisted to `multiplayer_sessions` on race completion.

---

## Socket Events

### Client → Server

| Event | Payload | Description |
|---|---|---|
| `create_room` | `{ user_id }` | Create a new race room |
| `join_room` | `{ room_id, user_id }` | Join an existing room |
| `leave_room` | `{ room_id, user_id }` | Leave a room before start |
| `player_ready` | `{ room_id, user_id }` | Mark player as ready |
| `progress_update` | `{ room_id, user_id, progress, wpm }` | Send live progress (0–100%) |
| `player_finished` | `{ room_id, user_id, wpm, accuracy }` | Player completed the text |

---

### Server → Client

| Event | Payload | Description |
|---|---|---|
| `room_created` | `{ room_id }` | Room successfully created |
| `player_joined` | `{ user_id, name }` | Another player joined |
| `player_left` | `{ user_id }` | A player left the room |
| `race_countdown` | `{ seconds: 3 }` | Countdown before race starts |
| `race_start` | `{ text, words }` | Race begins — sends the typing text |
| `progress_broadcast` | `{ user_id, progress, wpm }` | Live progress from other players |
| `player_finished_broadcast` | `{ user_id, rank, wpm }` | Another player finished |
| `race_over` | `{ results[] }` | All players finished or timeout |
| `error` | `{ message }` | Room error (full, not found, etc.) |

---

## Race Flow

```
1. Player A creates room → receives room_id
2. Players B, C join via room_id
3. All players emit player_ready
4. Server emits race_countdown (3...2...1)
5. Server emits race_start with shared text
6. All players type — each keystroke emits progress_update
7. Server broadcasts progress_broadcast to all room members
8. First finisher gets rank 1; others continue
9. On last finish (or 60s timeout), server emits race_over
10. Results are saved to multiplayer_sessions table
```

---

## Room Management

- **Room capacity:** 2–6 players (configurable)
- **Room expiry:** Rooms auto-close after 10 minutes of inactivity
- **Reconnection:** Players who disconnect mid-race are marked as DNF (Did Not Finish)
- **Minimum players:** Race starts only when ≥ 2 players are ready

---

## Progress Calculation

Progress is calculated client-side as:

```javascript
progress = (correctCharCount / totalTextLength) * 100
```

This value is emitted in `progress_update` and rendered as a progress bar for each player in the race UI.

---

## Frontend Integration

```javascript
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL);

// Join a room
socket.emit('join_room', { room_id: 'abc123', user_id: currentUser.id });

// Listen for race start
socket.on('race_start', ({ text }) => {
  setRaceText(text);
  startTypingEngine();
});

// Send progress updates
socket.emit('progress_update', {
  room_id: 'abc123',
  user_id: currentUser.id,
  progress: 45,
  wpm: 98
});

// Receive opponent progress
socket.on('progress_broadcast', ({ user_id, progress, wpm }) => {
  updateOpponentProgress(user_id, progress, wpm);
});
```

---

## Persistence

On `race_over`, the server saves results to the database:

```sql
INSERT INTO multiplayer_sessions (user_ids, start_time, end_time, results)
VALUES ($1, $2, $3, $4);
```

The `results` JSONB field stores per-user WPM, accuracy, and final rank.
