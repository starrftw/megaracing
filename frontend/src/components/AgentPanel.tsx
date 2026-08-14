export function AgentPanel() {
  return (
    <div style={{ marginTop: 20, padding: 16, border: "1px solid #222", borderRadius: 12 }}>
      <h3 style={{ margin: "0 0 8px 0" }}>Agent Mode</h3>
      <p style={{ margin: "0 0 10px 0", opacity: 0.8 }}>
        Connect an autonomous agent wallet and let it play automatically via the REST API.
      </p>
      <button style={{ padding: "10px 16px", background: "#222222", color: "#ffffff", border: "1px solid #444", cursor: "pointer" }}>
        Connect Agent Wallet
      </button>
    </div>
  );
}
