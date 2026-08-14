import { Router } from "express";

export const roundRouter = Router();

roundRouter.get("/current", (_req, res) => {
  res.json({
    roundId: "stub",
    status: "betting",
    timeLeft: 30,
    strikePrice: null,
    honksEnabled: true
  });
});

roundRouter.get("/:id", (req, res) => {
  res.json({ roundId: req.params.id, status: "stub" });
});
