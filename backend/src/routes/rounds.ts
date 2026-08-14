import { Router, Response } from "express";
import { RoundEngine } from "../services/roundEngine.js";

export const roundRouter = Router();
const engine = new RoundEngine();

roundRouter.get("/current", (_req, res: Response) => {
  const round = engine.getCurrentRound();
  res.json(round);
});

roundRouter.get("/:id", (req, res: Response) => {
  const round = engine.getRound(req.params.id);
  res.json(round);
});
