# BoniKeytype ⌨️

A premium full-stack typing practice platform similar to Monkeytype, featuring real-time multiplayer races, detailed statistics, and customizable themes.

## 🚀 Features

- **Premium Typing Engine**: Real-time WPM, accuracy, and character highlighting.
- **Real-time Multiplayer**: Compete with friends in synchronized typing races using WebSockets.
- **User Dashboard**: Track your typing history, average WPM, accuracy, and level up with XP.
- **Global Leaderboard**: Compete for the top spot on the all-time high score list.
- **Customizable Themes**: Support for Dracula, Carbon, Light, and Default themes.
- **Responsive Design**: Works seamlessly on desktop and mobile.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, TailwindCSS, Socket.io-client, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express, TypeScript, Socket.io, PostgreSQL, JWT, Bcrypt.
- **Database**: PostgreSQL with optimized indexing for leaderboards.

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- PostgreSQL installed and running

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd bonikeytype

# Install Backend dependencies
cd server
npm install

# Install Frontend dependencies
cd ../client
npm install
```

### 2. Database Setup

1. Create a PostgreSQL database named `bonikeytype`.
2. Run the schema migrations:
   ```bash
   psql -d bonikeytype -f server/db/schema.sql
   ```
3. Update `server/.env` with your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=bonikeytype
   JWT_SECRET=your_secret_key
   ```

### 3. Run the Servers

**Backend:**
```bash
cd server
npm run dev
# Server will run on http://localhost:5000
```

**Frontend:**
```bash
cd client
npm run dev
# Client will run on http://localhost:5173 (or 5174 if port is busy)
```

### 4. Seed Initial Data (Optional)

To populate the database with initial quotes:
```bash
cd server
npm run seed
```

## 📂 Project Structure

- `client/`: React frontend source code.
- `server/`: Express backend source code.
- `server/db/`: SQL schema and database configurations.
- `server/src/sockets/`: Real-time race logic.

## 📄 License

This project is licensed under the MIT License.
