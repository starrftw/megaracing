# Context Transfer: Game Jam → PRD v0.1

## Source Chat Summary
- Track: **Megapot** (prize: $5,000 total — $2,500 USD + $2,500 in tickets)
- Deadline: **August 14, 2026, 18:00 EDT**
- Must integrate Megapot into **core gameplay**, not just link-out
- Must be playable, publicly accessible prototype
- Testnet only (Base Sepolia)

## Game Concept (from other chat / PRD v0.1)
- **Mechanic:** Prediction market style — players bet on crypto price movement (BTC/ETH/etc.) per round
- **Round structure:** 
  - Rounds run continuously on timer, independent of player count
  - **Common source of randomness per round** (shared outcome seed), but each player's decision is independent
  - **Full lock during round** — no actions mid-round (cash-out mid-round is possible but changes all mechanics; defer for now)
  - Result distribution: not just binary 50/50 — smooth distribution with chance to win big or lose big
- **Scoring:** Win → USDC (or test tokens) + points. Lose → lose bet, minimal participation points. Points convert to Megapot tickets via in-game shop.
- **Free plays:** Initial free tries (zero-bet, points only) for humans. Agents can also get free attempts — needs balance consideration.

## Agent-First Requirement
- **Core:** Agent plays autonomously vs House (and/or other agents)
- Player sets strategy config for agent → agent makes decisions per round
- Multiple agents with different strategies can run simultaneously → live multiplayer without real humans
- Config example: `{"risk": "medium", "maxBet": 5, "stopLoss": 10, "autoBuyTickets": true}`
- Need to balance free plays for agents vs humans

## Megapot Integration
- Points earned in-game → convert to Megapot tickets
- Use `megapot-buy-random` or `megapot-buy-tickets` on Base Sepolia
- Game acts as referrer → earns referral fees on ticket sales
- Megapot integration must be meaningful part of core loop

## Frontend
- React + Three.js
- 3D visualization of round reveal (e.g., breaking cube, vault opening)
- UI: betting, balance, history, agent mode toggle
- Real-time leaderboard / results feed

## Branding Constraint
- **DO NOT use Edgezilla brand**
- Either:
  1. Keep existing racing theme (from PRD v0.1) + Megapot integration, OR
  2. Repackage with a simple, generic "edge/risk" theme (no godzilla, no racing IP)

## Open Questions for PRD Sync
1. Exact bet formats per round (binary, multi-outcome, partial win tiers?)
2. Balance parameters for testnet (RTP, point-to-ticket conversion rate, free plays count)
3. Randomness source (mock server-side, Pyth, DRAND?)
4. Agent strategy depth (parameter presets vs real decision-making per round?)
5. House algorithm (how does "the house" play / set odds?)
6. Leaderboard: per-round vs aggregated (session-based)?

## Next Step
Combine this with PRD v0.1 (racing concept) → produce unified "JAM x Pitstop" spec, then decide final theme (racing vs simple edge wrapper) before implementation.
