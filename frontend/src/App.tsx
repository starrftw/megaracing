import { useState, useEffect } from "react";
import { RacingScene } from "./components/RacingScene";
import { BetPanel } from "./components/BetPanel";
import { HonkShop } from "./components/HonkShop";
import { AgentPanel } from "./components/AgentPanel";
import { useRound } from "./hooks/useRound";

export default function App() {
  const round = useRound();

  return (
    <main style={{ padding: 24 }}>
      <h1>MegaRacing</h1>
      <RacingScene round={round} />
      <BetPanel round={round} />
      <HonkShop />
      <AgentPanel />
    </main>
  );
}
