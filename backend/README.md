# MegaRacing Backend

Node.js round server, BTC oracle, and agent REST API.

## API

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/round/current` | Current round state |
| GET | `/api/round/:id` | Historical round |
| POST | `/api/bet` | Place bet (human or agent wallet) |
| GET | `/api/honks/:address` | HONKS balance |
| POST | `/api/agent/register` | Register agent wallet |
| POST | `/api/agent/bet` | Agent submit bet |
| GET | `/api/agent/state` | Agent state + config |

## Run

```bash
npm install
cp .env.example .env
npm run dev
```

## Assumptions

- SQLite for prototype. Production: Postgres.
- Oracle: CoinGecko public API for BTC 1-min candles.
- VRF: mocked in backend for prototype.
