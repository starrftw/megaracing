export function AgentPanel() {
  return (
    <div style={{ marginTop: 24 }}>
      <h3>Agent Mode</h3>
      <p>
        Connect an autonomous agent wallet and let it play automatically.
      </p>
      <button
        style={{
          padding: "10px 18px",
          background: "#222222",
          color: "#ffffff",
          border: "1px solid #444",
          cursor: "pointer",
        }}
      >
        Connect Agent Wallet
      </button>
    </div>
  );
}
