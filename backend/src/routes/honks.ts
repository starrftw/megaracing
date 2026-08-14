import { Router } from "express";

export const honkRouter = Router();

honkRouter.get("/:address", (req, res) => {
  res.json({ address: req.params.address, honks: 0 });
});
