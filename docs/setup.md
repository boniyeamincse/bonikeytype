# 🛠️ Setup Guide

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | v18+ |
| npm | v9+ |
| PostgreSQL | v14+ |
| Git | Any recent version |

---

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/bonikeytype.git
cd bonikeytype
```

---

## 2. Database Setup

```bash
# Create the database
psql -U postgres
CREATE DATABASE bonikeytype;
\q

# Run migrations
psql -U postgres -d bonikeytype -f backend/db/migrations/001_create_tables.sql
```

---

## 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=bonikeytype

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Server
PORT=3000

# CORS
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The server will start at `http://localhost:3000`.

---

## 4. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 5. Seed Data (Optional)

Populate the quotes table with sample data:

```bash
cd backend
node db/seeds/quotes.js
```

---

## Project Structure

```
bonikeytype/
├── frontend/          # React app
├── backend/           # Node.js / Express server
│   ├── db/
│   │   ├── migrations/
│   │   └── seeds/
│   └── src/
├── docs/              # Documentation (this folder)
└── README.md
```

---

## Available Scripts

### Backend
| Command | Description |
|---|---|
| `npm run dev` | Start with nodemon (hot reload) |
| `npm start` | Production start |
| `npm test` | Run test suite |

### Frontend
| Command | Description |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build to `/dist` |
| `npm run preview` | Preview production build |

---

## Common Issues

**PostgreSQL connection refused**
Ensure PostgreSQL is running: `sudo service postgresql start`

**JWT errors on API calls**
Check that `JWT_SECRET` is identical in `.env` and not empty.

**CORS errors from frontend**
Verify `FRONTEND_URL` in backend `.env` matches your Vite dev server URL exactly (including port).

**Socket.io not connecting**
Ensure `VITE_SOCKET_URL` points to the backend server, not the frontend.
