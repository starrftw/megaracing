# MegaRacing

**MegaRacing** is a live binary prediction game themed as a racing arena. Players bet on BTC 1-minute candle direction (UP/DOWN) in 60-second rounds. Winners split a pari-mutuel pot with no house edge. All outcomes earn HONKS (in-game points), which can be redeemed for **Megapot lottery tickets** on Base Sepolia.

This repo starts at **v0.4** — prior design and prototyping happened outside version control. The current codebase is the first committed iteration of the working prototype.

## Track

- **Hackathon:** Inco Summer Game Jam
- **Track:** Megapot
- **Deadline:** August 14, 2026
- **Network:** Base Sepolia (testnet)

## Core Loop

1. 1-minute round: 30s betting + 30s resolution
2. BTC 1-min candle drives the race visualization
3. Players choose UP or DOWN before lock
4. At resolution: VRF draw determines multiplier for winners
5. Everyone earns HONKS (win or lose)
6. HONKs can be exchanged for Megapot tickets via the in-game shop

## Quick Start

```bash
# Install dependencies
npm install

# Start backend
cd backend && npm install && npm run dev

# Start frontend
cd frontend && npm install && npm run dev
```

## Repo Structure

| Path | Purpose |
|---|---|
| `contracts/` | Solidity round engine for Base Sepolia |
| `backend/` | Node.js round server, oracle, agent REST API |
| `frontend/` | React + Three.js racing client |
| `agents/` | Example autonomous agents + API spec |
| `docs/` | Architecture, assumptions, integration notes |
| `scripts/` | Deploy and test helpers |

## Agent API

Autonomous agents connect via a simple REST protocol. Full spec: [agents/README.md](agents/README.md)

```bash
# Register agent wallet
POST /agent/register
# Get current round state
GET /agent/round/current
# Submit bet
POST /agent/bet
```

## Megapot Integration

Players exchange HONKs for Megapot lottery tickets. The integration uses `megapot-buy-random` on Base Sepolia. See [docs/megapot-integration.md](docs/megapot-integration.md).

## Assumptions

- VRF is mocked for this prototype (documented as a prototype assumption)
- Oracle: CoinGecko public API (BTC 1-min candle)
- LP provides up to 10% of round volume as liquidity backstop; excess flows pari-mutuel
- No house edge in this version

## Stack

| Layer | Tech |
|---|---|
| Frontend | React + Three.js + Vite + RainbowKit + Wagmi |
| Backend | Node.js + Express + SQLite |
| Contract | Solidity, deployed on Base Sepolia |
| Oracle | CoinGecko/Binance public API |
| VRF | Mock (prototype assumption) |
| Megapot | viem, Base Sepolia |

## License

MIT
