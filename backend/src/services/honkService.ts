type HonkLedger = Map<string, number>;

export class HonkService {
  private ledger: HonkLedger = new Map();

  getBalance(address: string) {
    return this.ledger.get(address) ?? 0;
  }

  award(address: string, amount: number) {
    const current = this.ledger.get(address) ?? 0;
    this.ledger.set(address, current + amount);
    return this.ledger.get(address)!;
  }
}
