# 🔬 Advanced Features (Roadmap)

These features are optional enhancements planned for future phases of BoniKeytype.

---

## 🔥 Daily Challenges & Streaks

### Daily Challenge
- A fixed, server-selected text published each day at midnight UTC
- All users type the same text for fair daily comparison
- Daily leaderboard resets at midnight

### Streaks
- Award a streak counter for users who complete at least one test per day
- Visual flame icon with streak count on profile
- Streak milestones: 7 days, 30 days, 100 days
- Break recovery: one grace day allowed per 30-day window

**Database addition:**
```sql
ALTER TABLE users
  ADD COLUMN streak_count INTEGER DEFAULT 0,
  ADD COLUMN last_test_date DATE;
```

---

## 🧠 AI Typing Coach

An AI-powered suggestions system that analyzes a user's typing patterns and gives personalized improvement tips.

### Features
- Identifies most commonly mistyped key combinations (bigrams)
- Suggests targeted word drills for weak finger positions
- Provides weekly improvement summary

### Implementation Notes
- Analyze `typing_tests` history + per-character error data
- Store bigram error rates in a new `keystroke_stats` table
- Use a rule-based system first; optionally feed to a model for natural language tips

**Example output:**
> "You frequently miss the 'th' combination — try our 'th-focused' drill mode to build muscle memory."

---

## 📊 Typing Heatmap & Keystroke Analytics

Visual breakdown of typing performance at the character level.

### Heatmap
- Keyboard SVG where each key is colored by error rate
- Green = high accuracy, Red = frequent errors
- Filterable by test mode and time range

### Keystroke Analytics
- Average time per key press
- Most frequent typo substitutions (e.g., 'e' typed instead of 'r')
- Speed variance by finger (left pinky vs right index, etc.)

**New table:**
```sql
CREATE TABLE keystroke_stats (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER REFERENCES users(id),
  test_id     INTEGER REFERENCES typing_tests(id),
  key         CHAR(1),
  typed_as    CHAR(1),          -- NULL if correct
  time_ms     INTEGER,          -- time since last keystroke
  created_at  TIMESTAMP DEFAULT NOW()
);
```

---

## 🎮 Gamification (XP, Levels, Badges)

### XP System
Users earn XP for every completed test, scaled by WPM and accuracy:

```
XP = floor((wpm * accuracy / 100) * mode_multiplier)
```

| Mode | Multiplier |
|---|---|
| Timer (15s) | 0.5 |
| Timer (60s) | 1.0 |
| Words | 0.8 |
| Quote | 1.2 |

### Levels
XP thresholds unlock levels with titles:

| Level | Title | XP Required |
|---|---|---|
| 1 | Novice | 0 |
| 5 | Typist | 2,500 |
| 10 | Speed Demon | 10,000 |
| 20 | Keyboard Wizard | 50,000 |

### Badges
| Badge | Condition |
|---|---|
| 🚀 First Test | Complete first typing test |
| 💯 Perfect Round | 100% accuracy on any test |
| ⚡ Speed Racer | Achieve 100+ WPM |
| 🔥 On Fire | 7-day streak |
| 🏆 Champion | Rank #1 on global leaderboard |

**Database addition:**
```sql
ALTER TABLE users ADD COLUMN xp INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN level INTEGER DEFAULT 1;

CREATE TABLE user_badges (
  user_id     INTEGER REFERENCES users(id),
  badge_id    VARCHAR(50),
  earned_at   TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);
```

---

## 🌍 Multi-Language Support

- Extend word lists and quotes to cover: Spanish, French, German, Bengali, Japanese (romaji), etc.
- Language selector in settings
- Separate leaderboards per language
- Language-aware WPM scoring adjustments for CJK languages

---

## 📱 PWA Support

Convert to a Progressive Web App for offline practice:

- Service worker caches word lists locally
- Offline mode available for timer and word-count modes
- Push notifications for daily challenge reminders
