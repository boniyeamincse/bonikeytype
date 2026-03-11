-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    avatar_url TEXT,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Quotes Table
CREATE TABLE IF NOT EXISTS quotes (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    author VARCHAR(100),
    language VARCHAR(20) DEFAULT 'english',
    difficulty VARCHAR(20) DEFAULT 'medium'
);

-- Typing Tests Table
CREATE TABLE IF NOT EXISTS typing_tests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    wpm FLOAT NOT NULL,
    accuracy FLOAT NOT NULL,
    raw_wpm FLOAT NOT NULL,
    errors INTEGER NOT NULL,
    mode VARCHAR(20) NOT NULL, -- 'time', 'words', 'quote'
    mode_value VARCHAR(50), -- e.g., '15s', '50 words'
    language VARCHAR(20) DEFAULT 'english',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Leaderboard Table (Aggregated for performance)
CREATE TABLE IF NOT EXISTS leaderboard (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    best_wpm FLOAT NOT NULL,
    rank INTEGER,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL, -- badge name/achievement type
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Multiplayer Sessions Table
CREATE TABLE IF NOT EXISTS multiplayer_sessions (
    id SERIAL PRIMARY KEY,
    host_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'lobby', -- 'lobby', 'active', 'finished'
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    results JSONB -- Stores results of all participants
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_typing_tests_user_id ON typing_tests(user_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_best_wpm ON leaderboard(best_wpm DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_language ON quotes(language);
