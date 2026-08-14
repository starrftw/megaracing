import { useState, useEffect } from "react";

export function useRound() {
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

  return round;
}
