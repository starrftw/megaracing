const BOTS = [
  { id: "alpha", name: "Alpha", honks: 1240, winRate: 0.58, lastBet: "UP", streak: 3 },
  { id: "nova", name: "Nova", honks: 980, winRate: 0.51, lastBet: "DOWN", streak: -1 },
  { id: "rift", name: "Rift", honks: 760, winRate: 0.47, lastBet: "UP", streak: 1 },
  { id: "bolt", name: "Bolt", honks: 640, winRate: 0.55, lastBet: "DOWN", streak: 2 },
  { id: "echo", name: "Echo", honks: 510, winRate: 0.49, lastBet: "UP", streak: 0 },
];

export function Leaderboard() {
  return (
    <div style={{ marginTop: 20, padding: 16, border: "1px solid #222", borderRadius: 12 }}>
      <h3 style={{ margin: "0 0 10px 0" }}>Leaderboard</h3>
      <div style={{ display: "grid", gap: 8 }}>
        {BOTS.map((bot) => (
          <div
            key={bot.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 10px",
              background: "#0a0a0a",
              border: "1px solid #1a1a1a",
              borderRadius: 8,
            }}
          >
            <div>
              <strong>{bot.name}</strong>
              <div style={{ opacity: 0.7, fontSize: 12 }}>Last: {bot.lastBet} • Streak: {bot.streak}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div>{bot.honks} HONKS</div>
              <div style={{ opacity: 0.7, fontSize: 12 }}>WR {Math.round(bot.winRate * 100)}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
