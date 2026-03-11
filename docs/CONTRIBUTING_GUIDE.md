# 🛠️ Development & Contribution Plan

Use this guide to understand how to contribute code to BoniKeytype.

## 🏗️ Technical Architecture
BoniKeytype follows a classic client-server architecture:
- **Backend**: Node.js/Express in `server/`. Managed by `tsx`. Data stored in PostgreSQL.
- **Frontend**: React 18 in `client/`. Built with Vite and TailwindCSS.
- **Real-time**: Socket.io for multiplayer synchronization.

## 📋 Task List for New Contributors

### For Frontend Developers:
- [ ] **Refinement**: Improve the theme switcher with a search/filter if the list grows.
- [ ] **UX**: Add a "Restart Test" shortcut (e.g., `Tab + Enter`).
- [ ] **Visuals**: Add a "Ghost" line showing the previous best performance in real-time.

### For Backend Developers:
- [ ] **Security**: Implement rate limiting for auth and stats endpoints.
- [ ] **Optimization**: Optimize the Leaderboard query with Materialized Views.
- [ ] **Features**: Add a `/stats/overview` endpoint that returns year-over-year typing trends.

### For Full-Stack Developers:
- [ ] **Social**: Implement a "Follow Friends" system to see friends' stats on your dashboard.
- [ ] **Live Races**: Add a "Private Lobby" with a shareable link.

## 🚀 Workflow
1. **Explore**: Read the [Backend API](backend.md) and [Frontend Structure](frontend.md).
2. **Issue**: Find or create an issue for the feature you want to build.
3. **Branch**: `git checkout -b feat/your-feature-name`.
4. **Develop**: Keep your code typed (TypeScript) and styled (Tailwind).
5. **PR**: Push and create a Pull Request against `main`.

## 🧪 Testing Guidelines
- **Unit Tests**: Place in `__tests__` folders next to the code.
- **Verification**: Run `npm run dev` in both folders and verify your changes manually in the browser before submitting.
