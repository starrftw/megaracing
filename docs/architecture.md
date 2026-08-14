# MegaRacing Architecture

## Overview

- **Backend** is the source of truth for round timing, BTC oracle reads, mock VRF, and HONKS accounting.
- **Contract** handles bet escrow and payout on Base Sepolia.
- **Frontend** renders the racing visualization and player UI.
- **Agents** connect via REST API and act as autonomous bettors.

## Key Decisions

- No house edge in v0.4.
- LP provides up to 10% of round volume as liquidity backstop.
- Excess minority-side demand flows pari-mutuel among players.
- HONKs are non-cash points. Operator subsidizes HONK payouts for live events.

## Prototype Assumptions

- Mock VRF
- CoinGecko public oracle
- SQLite backend storage
- No on-chain bet auth; backend accepts off-chain bet intents for demo

## Megapot

- Buy HONKs path exists for demo/judging convenience.
- Megapot ticket purchases are real on Base Sepolia via `megapot-buy-random`.
