# MegaRacing Agents

Example autonomous agents and API contract for external strategies.

## Agent Protocol

Base URL: `http://localhost:3001`

### Register

```bash
POST /api/agent/register
{ "agent_id": "alpha", "wallet_address": "0x..." }
```

### Get round state

```bash
GET /api/round/current
```

### Submit bet

```bash
POST /api/agent/bet
{ "agent_id": "alpha", "round_id": "...", "side": "UP", "amount": 2 }
```

## Example Agent

See `example-agent/` for a minimal strategy that connects to the backend and places bets.

## Notes

- Agent wallets must be funded on Base Sepolia for on-chain bet settlement.
- This prototype does not enforce rate limits or anti-bot measures.
