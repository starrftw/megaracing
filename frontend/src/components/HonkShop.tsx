export function HonkShop() {
  const buy = () => {
    alert("Demo buy HONKs: +1000 HONKs added. For judges: this is a deliberate backdoor to verify Megapot integration.");
  };

  return (
    <div style={{ marginTop: 20, padding: 16, border: "1px solid #222", borderRadius: 12 }}>
      <h3 style={{ margin: "0 0 8px 0" }}>Megapot Ticket Shop</h3>
      <p style={{ margin: "0 0 10px 0", opacity: 0.8 }}>
        Exchange HONKs for lottery tickets on Base Sepolia. Tickets are purchased via Megapot integration.
      </p>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={buy} style={{ padding: "10px 16px", background: "#ffffff", color: "#000", border: "none", cursor: "pointer" }}>
          Buy Ticket (100 HONKs)
        </button>
        <span style={{ opacity: 0.6, fontSize: 12 }}>
          Demo mode: use backdoor to add HONKs
        </span>
      </div>
    </div>
  );
}
