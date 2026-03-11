# 🗺️ Project Roadmap & Task List

This document outlines the current state of BoniKeytype and the planned features for future development.

## ✅ Completed (Phase 1-5)
- [x] **Project Scaffolding**: React + Vite & Express + TS.
- [x] **Database Schema**: Users, Stats, Quotes, Leaderboard.
- [x] **Auth System**: JWT Registration & Login.
- [x] **Typing Engine**: Real-time WPM, Accuracy, and Highlight.
- [x] **Dynamic Themes**: Dracula, Carbon, Light, Default.
- [x] **User Profile**: XP, Level, and Typing History.
- [x] **Global Leaderboard**: Best WPM rankings.
- [x] **Multiplayer**: Real-time races using Socket.io.

---

## 🚀 Incoming Features (High Priority)
### 1. Daily Challenges
- [ ] Implement a nightly cron job to select a "Daily Quote".
- [ ] Create a dedicated "Daily Challenge" mode on the Home page.
- [ ] Add a daily leaderboard (resets every 24h).
- [ ] Track daily participation streaks on user profiles.

### 2. Typing Heatmap & Analytics
- [ ] Design a Keyboard SVG component for the Profile page.
- [ ] Record per-key errors in the database.
- [ ] Visualize error rates on the keyboard heatmap (Green to Red).
- [ ] Add "Common Typo Substitutions" breakdown (e.g., "e" instead of "r").

### 3. Advanced Gamification
- [ ] Implement Achievement/Badge system (e.g., "100 WPM Club").
- [ ] Add "Level Up" animations and sound effects.
- [ ] Enable "Profile Customization" (Custom avatars, profile banners).

---

## 🛠️ Infrastructure & Polish (Maintainers)
- [ ] **PWA Support**: Offline mode for practice tests and service worker caching.
- [ ] **Testing**: Unit tests for `useTypingEngine` and `authMiddleware`.
- [ ] **CI/CD**: GitHub Actions for linting and build verification.
- [ ] **Responsive Polish**: Ensure multiplayer race view is optimized for mobile.

---

## 🌍 Globalization
- [ ] Support for multiple languages (Spanish, French, German, Bengali).
- [ ] Right-to-Left (RTL) support for specific languages.
- [ ] Separate leaderboards for different languages.

---

## 🤝 Want to help?
Check the [GitHub Issues](https://github.com/boniyeamincse/bonikeytype/issues) and the [Contributing Guide](../CONTRIBUTING.md) to pick up a task!
