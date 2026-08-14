import express from "express";
import { roundRouter } from "./routes/rounds.js";
import { agentRouter } from "./routes/agents.js";
import { honkRouter } from "./routes/honks.js";

const app = express();
app.use(express.json());

app.use("/api/round", roundRouter);
app.use("/api/agent", agentRouter);
app.use("/api/honks", honkRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`MegaRacing backend listening on :${PORT}`);
});
