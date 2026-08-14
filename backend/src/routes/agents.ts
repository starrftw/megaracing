import { Router } from "express";

export const agentRouter = Router();

agentRouter.post("/register", (req, res) => {
  res.json({ status: "registered", agentId: "stub" });
});

agentRouter.post("/bet", (req, res) => {
  res.json({ status: "accepted", roundId: "stub" });
});

agentRouter.get("/state", (_req, res) => {
  res.json({ balance: "stub", config: {}, history: [] });
});
