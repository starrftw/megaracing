# PIT STOP — Context, Market & Strategy

| Field | Value |
|---|---|
| Document | Companion to PRD v0.1 |
| Status | Draft |
| Scope | Everything **outside** the product requirements doc: market fit, positioning, competitors, PMF, roadmap, migration notes |

> This file exists so the PRD stays a pure product spec ("what does it do"),
> and the story around it (why, who, versus whom, when) lives here.
> Nothing in this file is a product requirement.

---

## 1. Value Proposition & Positioning

### 1.1 The wedge

Crypto-native gamblers already watch BTC charts. They play crash/plinko on Rollbit, Stake,
BC.Game — pure RNG with zero connection to real markets. They follow CT, have opinions on
price action, and feel vaguely stupid playing games where their knowledge doesn't matter.

**Pit Stop is the first product where knowing that BTC tends to dump after a liquidity
sweep at a key level is actually worth something at the table.** That is the wedge.

### 1.2 Target player

- Watches BTC charts already; knows what a candle/every oracle reads.
- Currently pays house edge on pure-RNG games and wants it to *mean* something.
- Low-stakes, fast-feedback, social. Wants to be right, and to be seen being right.

### 1.3 Positioning vs alternatives

| Product | Problem | What Pit Stop has instead |
|---|---|---|
| Crash / Plinko | Pure RNG, no market connection | VRF multiplier on a real market outcome |
| Polymarket 5-min | Boring UI, slow, no social layer | Theme (race/arena), live events, points, shared arena |
| Perps trading | High stakes, stressful, skill-heavy | Low stakes, 60s rounds, intuition counts |

---

## 2. Product-Market Fit

### 2.1 PMF signals to watch

- Players return daily without a push (next round starts in ~30s; they have a read).
- Players talk about specific rounds ("hit ×8 when BTC flash-crashed at 3am") — shareable
  stories = organic marketing.
- The oracle creates debate: Pragma-style feed says 72% UP, minority says NO and wins —
  that moment gets clipped and posted.
- Retention curve flattens after ~6 weeks.

### 2.2 PMF killers to avoid

1. **Theme disconnected from price action.** If BTC pumps 0.5% in 3s and the visual
   doesn't respond, players instantly disengage. The reaction animation is non-negotiable.
2. **Pools too small at launch.** A $50 total pot feels like playing alone. Target
   **$500+/round** as minimum viable arena.
3. **Oracle feels decorative.** The published probability must be a *character* — sometimes
   dramatically wrong, subject to chat debate, the reason rounds are memorable.

---

## 3. Draft Roadmap (Solo Builder)

> Sequencing principle: **ship a paper/simulation mode before any real capital is at risk.**
> Behavioral data from simulation is worth more than rushing to real money.
> P0 = nothing else matters. P1 = required for real money. P2 = required for growth.
> Items are chain-agnostic here; concrete providers are chosen at build time.

| Phase | Priority | Deliverable |
|---|---|---|
| Phase 1 | P0 | Math engine: VRF slot table, points calc, balancer formula, PRS split. Monte Carlo ~100K rounds. Edge confirmed. |
| Phase 1–2 | P0 | Theme render: animated entities, price-driven motion, side indicators. Mobile-first (375px). Event triggers (SPEEDING / PHOTO FINISH) render. |
| Phase 2 | P0 | Oracle integration: strike read, UP/DOWN resolution, candle timing (testnet). |
| Phase 2–3 | P0 | **Simulation/paper mode**: full loop with bots, no wallet. Points, balancer, live events all functional. |
| Phase 3 | P1 | Shared arena: multiple players, live bet-side board, stake sizing by tier (Supabase Realtime / Ably or equivalent). |
| Phase 3–4 | P1 | Wallet UX: session keys, connect, gas abstraction. |
| Phase 4–5 | P1 | Settlement contracts (LP1/LP2, bet settlement, VRF reveal, points accounting, balancer guarantee) on target chain testnet. |
| Phase 5–6 | P1 | Real-money mode: deposits, live matchmaking, live balancer, points redemption (free-bet credits). |
| Phase 7 | P2 | Referral: ref links, points attribution, guild leaderboard. |
| Phase 7–8 | P2 | Provably-fair audit page. Public stats: 7-day edge, LP sizes, volume, points distributed. |
| Phase 8 | Launch | Closed beta: 10–20 users from CT/Discord. Paper converts to real. Feedback. Ship. |

---

## 4. Migration & Rebuild Notes (important for next session)

- The current implementation is a **demo only** — there is effectively no production
  frontend beyond the HTML prototype (`pit_stop_v9.html`), and the backend is being rebuilt
  **from scratch**.
- **Chain migration is planned** → the whole stack (message/bet rails, settlement, VRF,
  oracle, wallet UX) will be re-targeted. The PRD is deliberately chain-agnostic so this
  rebuild is config work, not redesign.
- **Theme migration is planned**: racing is the current example; the next theme direction is
  a **monster** concept (working domain: **Edgezilla.xyz**), i.e. guessing the chart is kept,
  visualization moves from races to a kaiju interaction. Applying the reskin surface in the
  PRD should be all that's needed mechanically.
- Deep design of the Edgezilla / new-chain transition happens in a separate chat; this file
  just records that it exists so context is not lost.

---

## 5. Open Strategy Questions

- Should bet-size tiers be $0.50..$100, or tighten to $1..$50?
- At what imbalance does the balancer preview become worth showing prominently?
- Racing now vs monster-first: which reskin wins the first launch?
- Where do whales cap work — the 55/45 hard cap handles one vector, but minimum-pot and
  per-whale caps need tuning.
