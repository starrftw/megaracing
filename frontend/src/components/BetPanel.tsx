import { useState } from "react";

type Side = "UP" | "DOWN";

const BET_SIZES = [0.5, 1, 5, 25];

export function BetPanel({ round }: { round: any }) {
  const [side, setSide] = useState<Side | null>(null);
  const [bet, setBet] = useState(BET_SIZES[1]);

  if (!round) return <p style={{ marginTop: 16 }}>Loading round…</p>;

  const locked = round.status === "locked" || round.status === "resolving" || round.status === "resolved";

  return (
    <div style={{ marginTop: 20, padding: 16, border: "1px solid #222", borderRadius: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ margin: "0 0 8px 0" }}>Round #{round.roundId ?? "—"}</h3>
          <p style={{ margin: 0, opacity: 0.8 }}>
            Status: <strong>{round.status ?? "betting"}</strong>
          </p>
          <p style={{ margin: 4, opacity: 0.8 }}>
            Total pot: <strong>${round.totalPot ?? 0}</strong>
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, opacity: 0.8 }}>Time left</p>
          <p style={{ margin: 4, fontSize: 24, fontVariantNumeric: "tabular-nums" }}>
            {typeof round.timeLeft === "number" ? `${round.timeLeft}s` : "—"}
          </p>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <p style={{ margin: "0 0 8px 0", opacity: 0.8 }}>Pick side</p>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setSide("UP")}
            disabled={locked}
            style={{
              padding: "12px 20px",
              background: side === "UP" ? "#00ff88" : "#0a2a1a",
              color: side === "UP" ? "#000" : "#00ff88",
              border: "1px solid #00ff88",
              cursor: locked ? "not-allowed" : "pointer",
              opacity: locked ? 0.5 : 1,
            }}
          >
            UP
          </button>
          <button
            onClick={() => setSide("DOWN")}
            disabled={locked}
            style={{
              padding: "12px 20px",
              background: side === "DOWN" ? "#ff3366" : "#2a0a14",
              color: side === "DOWN" ? "#fff" : "#ff3366",
              border: "1px solid #ff3366",
              cursor: locked ? "not-allowed" : "pointer",
              opacity: locked ? 0.5 : 1,
            }}
          >
            DOWN
          </button>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <p style={{ margin: "0 0 8px 0", opacity: 0.8 }}>Bet size (USDC)</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {BET_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setBet(size)}
              disabled={locked}
              style={{
                padding: "8px 12px",
                background: bet === size ? "#ffffff" : "#111111",
                color: bet === size ? "#000" : "#ffffff",
                border: "1px solid #333",
                cursor: locked ? "not-allowed" : "pointer",
                opacity: locked ? 0.5 : 1,
              }}
            >
              ${size}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={locked || !side}
        style={{
          marginTop: 16,
          padding: "12px 18px",
          background: side ? "#ffffff" : "#333333",
          color: side ? "#000" : "#888888",
          border: "none",
          cursor: locked || !side ? "not-allowed" : "pointer",
          opacity: locked || !side ? 0.5 : 1,
        }}
      >
        Confirm bet
      </button>
    </div>
  );
}
