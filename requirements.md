# PDPA Challenge Hub

Interactive PDPA awareness game for a corporate booth event. Runs as static files
on Vercel, XAMPP, or by opening `index.html` directly. No database, no backend.

## Constraints

- Plain HTML + CSS + vanilla JS. No frameworks, no npm, no build step.
- No company branding or logos of any kind. Fully generic and public-safe.
- Google Fonts (Space Grotesk + Outfit) loaded via CDN for the Gen-Z aesthetic.
- Served from Vercel at the repo root's `mockup/` folder, or locally.

## Design

Gen-Z / hyper style: dark background, vibrant violet-pink-cyan gradients,
glassmorphism cards, bold typography, emoji-heavy, energetic animations.
Feels like a game, not corporate training.

## Storage

- Current run: in-memory only. Refresh = fresh player.
- Leaderboard: `localStorage`. Survives refreshes, cleared manually.

## Games

### Bingo — Multiplayer (max 600 pts to main player)
- 2-6 players on the same device (hot-seat at the booth).
- Everyone sees the same 4×4 board of PDPA actions.
- Players take turns: draw a scenario → tap the matching action.
- Correct = +25 to that player. Wrong = turn passes.
- First to complete a line wins +100.
- Main (signed-in) player's score feeds the overall total.

### Jeopardy (max 1500 pts)
- 5 categories × 3 values (50/100/150). Multiple choice.
- Optional 30-second timer. Explanations on every answer.

### Crossword (max 700 pts)
- 9×12 interlocking grid, 8 PDPA terms.
- +75 per solved word, +100 for the full grid.
- Hint letter costs −15. Reveal word scores 0.

### Spot the Risk (max 500 pts)
- 16 workplace situations. Compliant or risk?
- +25 each, streak of 4 = +25 bonus (max 4 bonuses).

## Scoring & Tiers

- Max total: 3300
- ≥80% 🥇 PDPA Champion, ≥60% 🥈 PDPA Advocate, below 🥉 PDPA Learner

## Certificate

PNG download rendered on canvas. Shows name, tier, score, date.
No company logos or references.

## Files

```
mockup/
  index.html
  style.css
  app.js
  data.js
  tests.html
vercel.json
.gitignore
requirements.md
```
