import { useState, useEffect } from "react";
import { RacingScene } from "./components/RacingScene";
import { BetPanel } from "./components/BetPanel";
import { HonkShop } from "./components/HonkShop";
import { AgentPanel } from "./components/AgentPanel";
import { Leaderboard } from "./components/Leaderboard";

export default function App() {
  const [round, setRound] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setRound((prev: any) => {
        if (!prev) return { roundId: 1, status: "betting", timeLeft: 30, strikePrice: 104_250, totalPot: 42.5 };
        const next = { ...prev };
        if (next.status === "betting") {
          next.timeLeft = Math.max(0, (next.timeLeft ?? 30) - 1);
          if (next.timeLeft <= 0) next.status = "resolving";
        } else if (next.status === "resolving") {
          next.timeLeft = Math.max(0, (next.timeLeft ?? 30) - 1);
          if (next.timeLeft <= 0) {
            next.status = "betting";
            next.roundId = (next.roundId ?? 1) + 1;
            next.timeLeft = 30;
            next.totalPot = +(Math.random() * 80 + 20).toFixed(1);
          }
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
