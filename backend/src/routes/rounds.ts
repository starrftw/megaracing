import { Router, Response } from "express";
import { RoundEngine } from "../services/roundEngine.js";
import { HonkService } from "../services/honkService.js";

export const roundRouter = Router();
const engine = new RoundEngine();
const honks = new HonkService();

roundRouter.get("/current", (_req, res: Response) => {
  const round = engine.getCurrentRound();
  res.json(round);
});

roundRouter.get("/:id", (req, res: Response) => {
  const round = engine.getRound(req.params.id);
  res.json(round);
});

roundRouter.post("/buy-honks", (req, res: Response) => {
  const { address, amount = 1000 } = req.body ?? {};
  const newBalance = honks.award(address ?? "0xdemo", amount);
  res.json({ status: "ok", address, honks: newBalance });
});
