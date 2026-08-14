export class RoundEngine {
  private rounds: Map<string, any> = new Map();
  private currentRoundId = 0;

  getCurrentRound() {
    if (this.currentRoundId === 0) {
      return {
        roundId: null,
        status: "idle",
        timeLeft: 0,
        strikePrice: null,
        totalPot: 0,
        honksEnabled: true,
      };
    }

    const round = this.rounds.get(String(this.currentRoundId));
    if (!round) {
      return {
        roundId: this.currentRoundId,
        status: "betting",
        timeLeft: 30,
        strikePrice: null,
        totalPot: 0,
        honksEnabled: true,
      };
    }

    return {
      roundId: round.id,
      status: round.status,
      timeLeft: Math.max(0, Math.ceil((round.endTime - Date.now()) / 1000)),
      strikePrice: round.strikePrice ?? null,
      totalPot: (round.totalUp ?? 0) + (round.totalDown ?? 0),
      honksEnabled: true,
    };
  }

  getRound(id: string) {
    return (
      this.rounds.get(id) ?? {
        roundId: id,
        status: "not_found",
        timeLeft: 0,
        strikePrice: null,
        totalPot: 0,
        honksEnabled: true,
      }
    );
  }
}
