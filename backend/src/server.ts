import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/health", (_req, res) => {
  res.json({ status: "ok", roundEngine: "stub" });
});

app.listen(PORT, () => {
  console.log(`MegaRacing backend listening on :${PORT}`);
});
