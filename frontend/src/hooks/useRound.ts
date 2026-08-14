import { useState, useEffect } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

export function useRound() {
  const [round, setRound] = useState<any>({
    roundId: 1,
    status: "betting",
    timeLeft: 27,
    strikePrice: 104_250,
    totalPot: 42.5,
    honksEnabled: true,
  });

  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/round/current`);
        if (!res.ok) return;
        const data = await res.json();
        setRound(data);
      } catch {
        // backend not available; keep local stub state ticking
      }
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return round;
}
