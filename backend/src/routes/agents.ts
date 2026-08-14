import { Router, Response } from "express";
import { AgentService } from "../services/agentService.js";

export const agentRouter = Router();
const agents = new AgentService();

agentRouter.post("/register", (req, res: Response) => {
  const { agent_id, wallet_address } = req.body ?? {};
  const result = agents.register(agent_id, wallet_address);
  res.json(result);
});

agentRouter.post("/bet", (req, res: Response) => {
  const { agent_id, round_id, side, amount } = req.body ?? {};
  const result = agents.placeBet(agent_id, round_id, side, amount);
  res.json(result);
});

agentRouter.get("/state", (req, res: Response) => {
  const { agent_id } = req.query as { agent_id?: string };
  const result = agents.getState(agent_id);
  res.json(result);
});
