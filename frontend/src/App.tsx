import { useState, useEffect } from "react";
import { RacingScene } from "./components/RacingScene";
import { BetPanel } from "./components/BetPanel";
import { HonkShop } from "./components/HonkShop";
import { AgentPanel } from "./components/AgentPanel";
import { Leaderboard } from "./components/Leaderboard";
import { useRound } from "./hooks/useRound";

export default function App() {
  const round = useRound();

  return (
    <main style={{ padding: 24, maxWidth: 960, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>MegaRacing</h1>
        <span style={{ opacity: 0.7, fontSize: 12 }}>Prototype v0.4</span>
      </header>
      <RacingScene round={round} />
      <BetPanel round={round} />
      <HonkShop />
      <AgentPanel />
      <Leaderboard />
    </main>
  );
}
