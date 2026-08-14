# MegaRacing Contracts

Solidity contracts for MegaRacing, deployed on Base Sepolia.

## Contracts

| Contract | Purpose |
|---|---|
| `MegaRace.sol` | Round engine: bet placement, resolution, payout |
| `MockVRF.sol` | Mock VRF for prototype (replace with Pyth/Chainlink) |

## Setup

```bash
npm install
npx hardhat compile
npx hardhat test
```

## Deploy

```bash
npx hardhat run scripts/deploy.ts --network baseSepolia
```

## Assumptions

- This prototype uses a mock VRF. Production should use Pyth or Chainlink VRF.
- Bets are settled on-chain after hard lock. Off-chain signed bets are accepted in the backend, but final settlement happens here.
