import { useState, useEffect } from "react";

export function useRound() {
  const [round, setRound] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const res = await fetch("/api/round/current");
        const data = await res.json();
        setRound(data);
      } catch {}
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return round;
}
