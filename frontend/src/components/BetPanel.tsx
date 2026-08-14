export function BetPanel({ round }: { round: any }) {
  if (!round) return <p>Loading round…</p>;

  return (
    <div style={{ marginTop: 16 }}>
      <h3>Place Bet</h3>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          style={{
            padding: "10px 18px",
            background: "#00ff88",
            color: "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          UP
        </button>
        <button
          style={{
            padding: "10px 18px",
            background: "#ff3366",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          DOWN
        </button>
      </div>
      <p style={{ marginTop: 8 }}>
        Round #{round.roundId} — {round.status}
      </p>
    </div>
  );
}
