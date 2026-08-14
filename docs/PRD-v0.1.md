# PIT STOP — Product Requirements Document

| Field | Value |
|---|---|
| Document | PRD v0.1 |
| Status | Draft |
| Built from | Strategy v6.0 (PitStop_Strategy_v6.docx) — this PRD supersedes that doc |
| Scope | Product concept, chain-agnostic. Chain/theme are examples, not rules. |
| Reader | Solo builder + future collaborators migrating the concept to a new chain |

> **Agnostic by design.** This document describes *what* the product is, not *which*
> chain/oracle/host it runs on. Every concrete technology in this PRD (Starknet, Pragma,
> Cartridge, racing) is a **working example** — the current implementation, not a hard
> constraint. The bundle of crypto terms is a **theme layer** that must remain swappable
> without touching game economics. Anything purely about the market/positioning/competitors
> lives in the companion doc: [`context-market-strategy.md`](./context-market-strategy.md).

---

## 1. Product Overview

Pit Stop is a live, thematically presented binary prediction game. Each round runs on a
fixed timer: a real market price candle (e.g. BTC 1-minute) opens, players wager **YES** or
**NO** on which direction the candle will close, and at resolution winners are paid through
a verifiable random multiplier. The current visualization presents each round as a **race**
(the price action literally drives the racers) — this is a theme layer and can be reskinned
(monster/kaiju arena, space, sports…) without changing the rules below.

Every outcome — win or lose — earns **points** (the platform's non-cash currency, working
name **HONKS**), so a loss is never a dead end.

- **Crypto-native players who already watch charts** are the target audience; they are
  comfortable with wallets, candles and oracle reads.
- Unlike *crash / plinko* (pure RNG, no market connection), market intuition genuinely
  matters.
- Unlike *perps trading* (high stakes, stressful), it is fast, low-stakes and social.

### 1.1 The Core Loop

A round is **120 seconds** total:

- **Betting phase (60s):** live strike price and oracle probability are displayed. Players
  place YES/NO bets at fixed sizes, freely change/cancel, and may opt into the balancer
  "Lock In" bonus (see §6).
- **Resolution phase (60s):** the candle runs while the price animation plays. Live events
  fire mid-race and pay bonus points for watching. At candle close, the oracle resolves
  UP/DOWN, **one** VRF draw produces a multiplier for all winners (and scales points), and
  payouts are distributed.

Everyone gets paid something, every round:

| Who | What they get |
|---|---|
| Winners | Cash payout = bet × VRF multiplier |
| Losers | No cash (except when a big multiplier lands — see §4.3) |
| Everyone | Points (HONKS) — win or lose |

### 1.2 Naming & Theme (WORKING, not final)

- Working name: **Pit Stop** — the pit stop is the last-second decision before the race
  locks. **Theme-agnostic**: any "final decision before result" metaphor works (monster
  approaching the city, rocket launch window, etc.).
- Points currency: **HONKS** — memorable, ownable. A theme-rename is trivial (it is a pure
  label in the points subsystem).
- Stake size is reflected in the visualization: big bettor = big racer/entity.

---

## 2. Goals, Non-Goals

### 2.1 Goals (v0.1)

1. Ship a provably-fair, live binary market game with a readable-to-players theme.
2. Guarantee positive expected bookmaker economics with a transparent, verifiable edge
   (house edge + points economy) — no hidden rake on bets.
3. Make every loss compensation-bearing so churn stays low (points on every outcome,
   balancer bonus on minority lock-ins).
4. Keep per-player on-chain footprint minimal (bets off-chain, settlement on-chain).
5. Fully reskinnable theme + re-hostaable chain without touching the math engine.

### 2.2 Non-Goals (v0.1)

- Not a trading platform, no order books, no perps/futures.
- Not a pure-RNG carnival game: outcome **must** trace to real market data.
- No external market/parimutuel dependency for core math (single internal pool system).
- No player-vs-player bookmaking.

---

## 3. Game Mechanics

### 3.1 Round Parameters

| Parameter | Default | Notes |
|---|---|---|
| Round length | 120s | 60s betting + 60s resolution |
| Market feed | BTC 1-min candle | Configurable pair/timeframe |
| Bet sizes | fixed tiers | e.g. $0.50 / $1 / $5 / $25 / $100 |
| Resolution | oracle UP/DOWN of candle close vs strike | Single strike, published at open |
| Randomness | 1 VRF draw per round | Derives winner multiplier + points scaling |

### 3.2 Theme (Reskin Surface)

The theme is a presentation layer and **must not** cascade into economics:

- Current example: racing — cars scale with bet size, cars are driven by live price moves.
- Events (§5) are *triggered* by price/oracle behavior and are rendered by the theme.
- Any replacement (monster/kaiju, nemesis, rocket) only changes rendering + copy.

### 3.3 Fairness

- Strike, probability and resolution come from a committed oracle feed.
- One VRF draw per round, revealed at settlement, verifiable by anyone.
- Final pot state is committed at hard lock, before resolution.

---

## 4. Economy & Math

All math is a single internal pool system; there is no external market dependency.

### 4.1 Money Flow — One Round

1. Bets accumulate into the **pot** during the betting phase.
2. At resolution the oracle announces UP/DOWN and the VRF produces one multiplier.
3. Each winner gets `cash payout = bet size × VRF multiplier`.
4. Round margin (house edge) is split: part to **Player Reward System (PRS)**, rest is net
   profit to the house accumulator (LP2).
5. Everyone earns points (HONKS) — winner or loser.

### 4.2 Multiplier Table (11 fixed slots, tunable)

One VRF draw per round picks the multiplier for **all** winners; the same draw scales
points for **all** players.

| Mult | Prob | 1-in-X | $10 Win | HONKS W | HONKS L |
|---|---|---|---|---|---|
| ×10.0 | 0.30% | 1 in 333 | $100 | 3.6 | 2.4 |
| ×8.0 | 0.70% | 1 in 143 | $80 | 2.9 | 1.9 |
| ×5.0 | 1.50% | 1 in 67 | $50 | 1.8 | 1.2 |
| ×3.5 | 3.00% | 1 in 33 | $35 | 1.3 | 0.8 |
| ×2.5 | 5.00% | 1 in 20 | $25 | 0.9 | 0.6 |
| ×2.0 | 6.00% | 1 in 17 | $20 | 0.7 | 0.5 |
| ×1.8 | 9.00% | 1 in 11 | $18 | 0.6 | 0.4 |
| ×1.6 | 12.00% | 1 in 8 | $16 | 0.6 | 0.4 |
| ×1.4 | 15.00% | 1 in 7 | $14 | 0.5 | 0.3 |
| ×1.2 | 15.00% | 1 in 7 | $12 | 0.4 | 0.3 |
| ×1.0 | 33.50% | 1 in 3 | $10 | 0.4 | 0.2 |

- **HONKS W** = Win points on a $10 bet: `1.5% × mult × 24`. **HONKS L** = Loss points:
  `1.0% × mult × 24`. Big multiplier on a loss = real consolation prize.

### 4.3 Math Summary (currently calibrated)

| Metric | Value |
|---|---|
| E[multiplier] | ×1.590 |
| House edge | 20.5% of pot |
| Cash RTP | 79.5% |
| Full RTP (cash + points) | ~83–84% |
| Gross margin @ $1,000 pot | ~$205 |
| PRS allocation (4% of pot) | $40 |
| Net margin after PRS | ~16.5% |
| Imbalance cap | 55/45 — excess refunded FIFO at hard lock |

> All of the above are the **current calibration**. Tuning the table / edge is a config
> exercise, not an architectural one — the PRD is about the machinery, not the dials.

### 4.4 Player Reward System (PRS)

PRS is funded at **4% of pot per round** — directly from pot volume, not from margin — so
reward flow is stable regardless of VRF variance. The 4% splits into buckets:

| Bucket | % of Pot | $ @ $1k Pot | Purpose |
|---|---|---|---|
| Points Rakeback | 2.4% | $24 | Long-term accumulation, redeemed as free bets |
| Live Round Pool | 0.8% | $8 | In-round points during resolution phase (§5) |
| Balancer Pool | 5.6% | $56 | Guaranteed points for minority-side lock-ins (§6) |
| Referral / KOL | 0.8% | $8 | Ref rewards + guild leaderboard (§7) |
| **TOTAL PRS** | **9.6%** | **$96** | Net margin ~16.5% |

> Note: percentage sum is 9.6% because 5.6% of the balancer is drawn from the general
> stream; balancer only *spends* when an imbalance exists and players lock in — unspent
> rolls to reserve, so effective PRS spend per average round is lower.

### 4.5 Points ("HONKS") — Non-Cash Currency

- Non-transferable, non-tradable. **One use: redeem for free bets at fixed sizes.**
- Rate: **24 HONKS = $1 free bet**.

| Free Bet | HONKS | Free Bet | HONKS |
|---|---|---|---|
| $0.50 | 12 | $25.00 | 600 |
| $1.00 | 24 | $50.00 | 1,200 |
| $5.00 | 120 | $100.00 | 2,400 |
| $10.00 | 240 | | |

- Rakeback points accumulate and are redeemed separately from live-round points — same
  wallet balance, same redemption table.

### 4.6 XP — Cosmetic Progression (no cash value)

XP is derived from the same activity data as points (zero extra computation). Every point
also generates XP. XP drives cosmetics: skins, track/theme unlocks, badges. Battle-pass
style, endless levels, retroactive rewards possible later.

---

## 5. Live Round Events (resolution-phase rewards)

The **Live Round Pool (0.8% of pot)** pays out points *during* the 60s resolution phase,
not after. Time-gated phases keep eyes on screen through the end of the round.

### 5.1 Phase Structure

| Phase | Budget | Notes |
|---|---|---|
| P1 (0–20s) | 20% of pool | First events fire here; leftovers roll to P2 |
| P2 (20–40s) | 20% + P1 leftover | Mid-race; growing pot (P1 usually rolls over) |
| P3 (40–60s) | all remaining | Biggest pot → final 20s have the most points |

### 5.2 Trigger Events (theme example: racing)

| Event | Trigger | Payout rule | Notes |
|---|---|---|---|
| **SPEEDING** 🔥 | Price moves ≥ 0.5% within any 3s window | Correct-side players split that phase's budget, proportional to bet size | Big bettor gets more; small bettor gets a taste; visual boost animation |
| **PHOTO FINISH** 📸 | Price within 0.1% of strike with ≤ 5s left | **All players** (both sides) split remaining pool | Shared tension moment; keeps engagement on flat candles |

- No events in a phase → budget rolls forward (P3 is almost always the biggest, by design).
- Event *triggers* are price/oracle conditions; the *rendering* is theme-owned.

---

## 6. Balancer System

The protocol needs to attract the minority side when the pot is imbalanced. Instead of a
payout multiplier (complex math + whale-exploit surface), it offers **guaranteed points for
minority-side lock-ins**.

### 6.1 Mechanic

- During betting, live imbalance is shown.
- Players on the minority side may tick **Lock In** any time before the soft lock.
- On lock-in, the delimited settlement **immediately guarantees** N points for that bet —
  win or lose. Same points either way (instant guaranteed "cashback", paid in points).
- No lock-in = no balancer bonus. Lock-in = committed: cannot cancel or switch side.
- Funded from the dedicated Balancer Pool (§4.4), fully separate from rakeback points.
- Budget cap: at worst-case 55/45 with all minority players locked, the pool still covers.

### 6.2 Points Rate Table (current calibration)

| Split | HONKS / $1 | $5 bet | $25 bet | $100 bet |
|---|---|---|---|---|
| 50 / 50 | 0.0 | 0 | 0 | 0 |
| 51 / 49 | 0.5 | 2.5 | 12.5 | 50 |
| 52 / 48 | 1.0 | 5 | 25 | 100 |
| 53 / 47 | 1.5 | 7.5 | 37.5 | 150 |
| 54 / 46 | 2.0 | 10 | 50 | 200 |
| **55 / 45** | 3.0 | 15 | 75 | **300** |

- Max case: $100 minority bet at 55/45 → 300 HONKS = $12.50 guaranteed. Meaningful for a
  whale willing to go minority.

### 6.3 Betting Lifecycle

| Time | Event |
|---|---|
| T-60s | Round opens. Strike published, oracle probability live. |
| T-60s → T-10s | Betting open: place / cancel / switch freely. Balancer preview updates live with pool shifts. |
| **T-10s** | **Soft lock.** Balancer points freeze. "Lock In" ticks guarantee the bonus. Locked players cannot cancel/switch. |
| T-10s → T-2s | New bets accepted, **no** balancer bonus for late entries. Locked players committed. |
| **T-2s** | **Hard lock.** No new bets. Pool finalized. 55/45 check fires — excess majority bets refunded FIFO. |
| T-0s | Candle opens; resolution phase (theme render) starts. |
| T+60s | Candle closes. Oracle resolves UP/DOWN. VRF fires once. |
| Settle | Cash to winners; points (rakeback + balancer if locked) to all; live-round points per events. |

---

## 7. Liquidity Pools ("LP1" / "LP2")

Two house-controlled pools with distinct jobs. (Names are working labels; the function split
is the point.)

### 7.1 LP1 — Matchmaker

- Sole job: keep rounds running when player bets are imbalanced (fills the minority side).
- E.g. $60 YES / $30 NO → LP1 fills $30 on NO so every round has a valid 50/50 (before
  oracle-probability adjustment).
- Earns from the pot when its side wins, absorbs loss when it loses.
- Fills up to **20% of its own size per round**; no upfront fee, no rake.
- Size set by operator. **MVP target: $500 LP1 → supports up to $100 fill/round.**

### 7.2 LP2 — Profit Accumulator

- Receives the net margin after PRS. The house's retained earnings pool; grows over rounds.
- Future: open to external stakers ("yield from live operation" is the pitch to DeFi
  farmers).

| Daily Volume | Gross Profit/day | Net to LP2/day (~16.5%) |
|---|---|---|
| $500 | $102.50 | $82.50 |
| $1,000 | $205.00 | $165.00 |
| $5,000 | $1,025 | $825 |
| $20,000 | $4,100 | $3,300 |

- Basis: 1,440 rounds/day at 1/min. Long-run expectations — per-round variance is high.

---

## 8. Referral & KOL

Baked into PRS at **0.8% of pot/round**.

### 8.1 Long-term referral

- Referrer earns a % of their referee's points generation — **permanently**, paid from the
  house PRS allocation, never from the player's pocket. Rewards active players, not signups.
- Paid in points, redeemed as free bets.

### 8.2 Guild leaderboard

- Weekly points pool split among top guild leaders by guild volume that week. Resets Monday.
- Leader takes a larger share; members a smaller cut. KOL tournament energy.
- Pool is derived from **actual** weekly volume (0.8%), so it always feels proportionate.

---

## 9. Technical Architecture (Chain-Agnostic)

### 9.1 Principles

1. **Bets are off-chain** (signed messages) — zero latency, zero per-bet gas.
2. **On-chain actions are minimal**: deposit · withdraw · settle; VRF reveal; oracle read;
   LP settlement.
3. **One VRF draw per round** → a single seed derives all multipliers (cheap, uniform).
4. **Provably fair**: fiddle of the final pot at hard lock happens before resolution;
   any round can be verified.
5. **Chain-agnostic wallet/gas UX** is a requirement: session-key login, no-gas for players.
6. Theme and chain are **replacable** — math engine is pure and testable off-chain too.

### 9.2 Component Roles

| Component | Role | Hostable anywhere |
|---|---|---|
| Settlement contract | Accepts deposits/withdrawals, commits pot at hard lock, pays winners + points | Yes (this is the chain-dependent part) |
| VRF provider | Draws the single round multiplier | Any verifiable randomness source |
| Oracle feed | Strike price + UP/DOWN resolution + live probability | Any committed price feed |
| Signer/relayer | Collects off-chain bets, submits settlement bundle | Serverless/background service |
| Game server | Round timing, event detection, balancer math, leaderboards | Standard backend |
| Wallet UX | Session keys + gas abstraction | Any chain's ecosystem tooling |

### 9.3 Round Flow (Off-chain vs On-chain)

- During the open phase: bets are signed off-chain (no latency/gas per bet).
- **T-2s hard lock:** server commits the final pot state on-chain.
- Candle close → oracle read → VRF fires → settlement contract distributes cash + points
  from the confirmed draw.
- Everything verifiable.

### 9.4 Reference Stack (CURRENT EXAMPLE — not a requirement)

| Layer | Current (example) | Why agnostic |
|---|---|---|
| Chain | Starknet | Any chain with cheap tx + a VRF/oracle story suffices |
| Price oracle | Pragma | Any candle-committing feed |
| VRF | Cartridge | Any verifiable randomness |
| Login + NFT | Cartridge Controller | Session-key UX, wallet-free |
| Gas abstraction | Cartridge Paymaster | No-gas UX requirement, provider-agnostic |
| Tx volume (est.) | ~5,760/day (1,440 rounds × ~4 tx) | Budget-scale check |
| Hard cap | 55/45 per round | Product rule, not chain rule |
| Upfront fee | NONE | Product rule |

> Est. on-chain tx/day (~5,760) and the 55/45 cap are **product numbers** (they move with
> round rate and calibration) — restated here only for budgeting context, not as fixed specs.

---

## 10. Success Metrics (v0.1)

- **Retention:** players return daily without push (next round starts in ~30s + they have a
  read on the market).
- **Shareability:** players talk about specific rounds ("hit ×8 when BTC flash-crashed").
- **Oracle debate:** wrong-but-confident oracle calls get clipped and shared.
- **Retention curve flattens:** players active 6+ weeks after joining.
- **Stability:** every round settles on time; verifiable fairness works end-to-end in
  paper mode before capital.

---

## 11. Open Questions / TBD

- Exact bet-size tier set; whether $0.50 tier stays (friction vs accessibility).
- Balancer rate table at intermediate splits; whether it should be continuously computed
  vs stepwise.
- Theme lock: which reskin goes first (racing now vs monster/kaiju next).
- Chain selection for the rebuild (full backend rewrite planned — see companion doc).
- **PRS funding inconsistency (inherited from v6.0):** §4.4 states "4% of pot" but the
  bucket table totals 9.6% (source doc has the same contradiction). Decide whether PRS
  funding is 9.6% of pot *gross*, or 4% with the balancer funded elsewhere — this changes
  net margin and must be resolved before calibration locks.

---

## 12. Out of Scope / Future (v0.1)

- External staking on LP2.
- NFT badges / skin marketplaces (XP cosmetics only for now).
- Multi-asset / multi-timeframe rounds.
- Importing existing on-chain state; this is a **from-scratch rebuild** of backend + front
  end (current frontend exists only as a demo).

---

## Appendix A — Revision History

| Rev | Source | Note |
|---|---|---|
| v1–v5 | prior strategy iterations | Evolution toward current model |
| v6.0 | PitStop_Strategy_v6.docx | Baseline; E[mult], PRS, balancer, LP1/LP2, referral drafted |
| **v0.1 (PRD)** | this document | Rewrite to chain/theme-agnostic PRD; product rules separated from reference stack |

> The previous .docx (v6.0) is superseded. Where this PRD and the .docx disagree, the PRD
> (as the agnostic restatement) wins.
