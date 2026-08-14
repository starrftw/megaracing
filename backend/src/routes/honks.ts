import { Router, Response } from "express";
import { HonkService } from "../services/honkService.js";

export const honkRouter = Router();
const honks = new HonkService();

honkRouter.get("/:address", (req, res: Response) => {
  const balance = honks.getBalance(req.params.address);
  res.json({ address: req.params.address, honks: balance });
});
