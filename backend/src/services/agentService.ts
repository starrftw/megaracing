type AgentConfig = {
  risk: "low" | "medium" | "high";
  maxBet: number;
  autoPlay: boolean;
};

type AgentState = {
  agentId: string;
  walletAddress: string;
  balance: number;
  config: AgentConfig;
  history: any[];
};

export class AgentService {
  private agents: Map<string, AgentState> = new Map();

  register(agentId: string | undefined, walletAddress: string | undefined) {
    const id = agentId ?? `agent_${Date.now()}`;
    const addr = walletAddress ?? "0x0000000000000000000000000000000000000000";

    const state: AgentState = {
      agentId: id,
      walletAddress: addr,
      balance: 0,
      config: { risk: "medium", maxBet: 5, autoPlay: false },
      history: [],
    };

    this.agents.set(id, state);
    return { status: "registered", agent_id: id, wallet_address: addr };
  }

  placeBet(
    agentId: string | undefined,
    roundId: string | undefined,
    side: string | undefined,
    amount: number | undefined
  ) {
    if (!agentId || !this.agents.has(agentId)) {
      return { status: "error", message: "agent not registered" };
    }

    const agent = this.agents.get(agentId)!;
    const betAmount = amount ?? 1;
    const betSide = side === "DOWN" ? false : true;

    agent.history.push({
      roundId,
      side: betSide ? "UP" : "DOWN",
      amount: betAmount,
      timestamp: Date.now(),
    });

    return {
      status: "accepted",
      round_id: roundId,
      side: betSide ? "UP" : "DOWN",
      amount: betAmount,
    };
  }

  getState(agentId: string | undefined) {
    if (!agentId || !this.agents.has(agentId)) {
      return { status: "error", message: "agent not registered" };
    }

    return this.agents.get(agentId)!;
  }
}
