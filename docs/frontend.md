# 🖥️ Frontend

## Pages

### `/` — Home (Typing Interface)
The core page. Loads the typing box, mode selector, and live stats. Handles all test logic via the `useTypingEngine` hook.

### `/profile` — User Profile
Displays user stats: total tests, average WPM, best WPM, accuracy trend. Shows a paginated history of past tests with filters by mode and date.

### `/leaderboard` — Leaderboard
Tabbed view for global, daily, and friends rankings. Fetches data from `/leaderboard` API.

### `/settings` — Settings
Allows customization of theme, font, caret style, and default test mode. Preferences are saved to localStorage and synced to user profile on login.

### `/login` and `/register`
Standard auth forms with field validation. On successful login, JWT is stored in memory (not localStorage) and user is redirected to home.

---

## Key Components

### `TypingTest.tsx`
The main input area.

- Renders word list as individual `<span>` elements
- Applies CSS classes: `correct`, `incorrect`, `untyped`, `extra`
- Hidden `<input>` captures keystrokes
- Handles backspace, space, and all printable characters

**Props:**
```jsx
<TypingTest
  text={string}
/>
```

---

### `Timer`
Displays elapsed or countdown time depending on mode.

- In timer mode: counts down from duration
- In word mode: counts up until all words are typed
- Stops on test completion
- Emits tick events for real-time WPM calculation

---

### `StatsDisplay`
Shows live statistics during and after a test.

| Stat | When |
|---|---|
| WPM | Live (updates every second) |
| Accuracy | Live |
| Errors | Live |
| Time elapsed | Post-test only |
| Character breakdown | Post-test only |

---

### `LeaderboardTable`
Renders ranked rows with user avatar, name, WPM, accuracy, and date. Supports sorting by WPM or accuracy.

---

### `SettingsForm`
Controlled form component for all user preferences. Emits a single `onChange` callback with the full settings object.

---

## Custom Hooks

### `useTypingEngine(words, options)`
Encapsulates all typing logic:
- Tracks cursor position, correct/incorrect characters
- Calculates live WPM and accuracy
- Emits `onComplete` with final stats

### `useTimer(duration, active)`
Manages countdown or elapsed timer. Returns `timeLeft` or `timeElapsed` and a `start/stop/reset` interface.

---

## State Management

The app uses:
- **LocalStorage**: For persisting JWT token, User profile, and Theme preference.
- **React Context** (`ThemeContext`): For managing the active UI theme.
- **Custom Hooks** (`useTypingEngine`): For localized typing state.

---

## Styling Notes

- TailwindCSS with `@tailwindcss/postcss`.
- **Custom Themes**: Defined in `index.css` via CSS variables (`--main-color`, `--bg-color`, etc.).
- **Transitions**: Smooth transitions between themes and UI states.
