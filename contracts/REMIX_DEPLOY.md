# Deploy contracts in Remix (no local install)

1. Open https://remix.ethereum.org
2. Create a new workspace or use default
3. Create these files in `contracts/`:
   - `MegaRace.sol`
   - `MockVRF.sol`
   - `MockUSDC.sol`
4. Paste content from this directory
5. Compile with Solidity 0.8.20
6. Deploy `MockUSDC` first (get address)
7. Deploy `MegaRace` with:
   - `_usdc`: MockUSDC address
   - `_lpWallet`: your LP wallet address
   - `_operator`: your operator address
8. Use `startRound()` to open rounds
9. Use `placeBet(roundId, side, amount)` to bet (USDC 6 decimals)

## Base Sepolia USDC

If you want real USDC instead of MockUSDC:
- USDC: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`

## Notes

- This is a prototype contract. Do not use in production without audit.
- VRF is mocked. Replace with Pyth/Chainlink in production.
