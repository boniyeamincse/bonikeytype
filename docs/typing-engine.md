# ⌨️ Typing Engine

## Overview

The typing engine is the core of BoniKeytype. It handles keystroke tracking, character classification, real-time WPM calculation, and final stat submission.

---

## Lifecycle

```
1. Load word list or quote
       ↓
2. Render words as tracked spans
       ↓
3. Wait for first keystroke → start timer
       ↓
4. Track each keystroke in real time
       ↓
5. Test ends (timer runs out or words completed)
       ↓
6. Calculate final stats
       ↓
7. Submit stats to backend
       ↓
8. (Optional) Update multiplayer session via WebSocket
```

---

## Character Classification

Each character typed is classified into one of four states:

| Class | Description |
|---|---|
| `correct` | Typed character matches expected character |
| `incorrect` | Typed character does not match expected character |
| `extra` | Character typed beyond the word's length |
| `missing` | Expected character not typed (end of word, backspace past) |

These classes are applied as CSS on individual `<span>` elements for visual feedback.

---

## WPM Calculation

**Formula:**

```
WPM = (Total Characters Typed / 5) / Minutes Elapsed
```

- Characters are divided by **5** to normalize to "standard words"
- Only **correct** characters are counted in the numerator
- Minutes elapsed = `seconds / 60`

**Live WPM** is recalculated every second using a sliding window or cumulative average.

**Example:**

```
Correct characters typed: 275
Time elapsed: 1 minute
WPM = (275 / 5) / 1 = 55 WPM
```

---

## Accuracy Calculation

```
Accuracy = (Correct Characters / Total Characters Typed) * 100
```

- `Total Characters Typed` includes all keystrokes, including errors
- Rounded to 2 decimal places

**Example:**

```
Correct: 270
Total typed: 278
Accuracy = (270 / 278) * 100 = 97.12%
```

---

## Backspace Handling

- Backspace removes the last character from the current word
- Backspace **cannot** move the cursor to a previous word by default
- An optional setting allows "backspace to previous word" — off by default

---

## Space Handling

- Pressing Space advances to the next word
- If the current word has errors, the word is marked incorrect but the cursor still advances
- Extra spaces are ignored

---

## Timer Modes

### Timer Mode
- Timer counts down from selected duration (15 / 30 / 60 / 120 seconds)
- Test ends when timer reaches 0
- WPM is calculated over the full duration

### Word Count Mode
- Timer counts up
- Test ends when all N words have been typed
- WPM is calculated over actual elapsed time

### Quote Mode
- Same logic as word count mode
- Words are sourced from a single quote fetched from backend

### Custom Mode
- User pastes their own text
- Same logic as word count mode

---

## Stats Object (Emitted on Completion)

```javascript
{
  wpm: 105,
  accuracy: 97.4,
  errors: 8,
  correct_chars: 412,
  total_chars: 420,
  extra_chars: 2,
  missing_chars: 0,
  time_seconds: 60,
  mode: "timer",
  language: "english"
}
```

---

## Implementation Notes

- The `<input>` element is hidden and kept focused during the test
- Word list is pre-generated on page load (200 words buffer)
- DOM updates use `requestAnimationFrame` for smooth rendering
- On mobile: virtual keyboard is triggered via `input[type="text"]`
