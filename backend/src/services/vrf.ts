export class MockVRF {
  private counter = 0;

  requestRandomness() {
    this.counter++;
    const random = Math.floor(Math.random() * 1_000_000_000);
    return {
      requestId: this.counter,
      random,
      multiplier: this.randomToMultiplier(random),
    };
  }

  private randomToMultiplier(random: number): number {
    if (random < 300_000) return 10;
    if (random < 1_000_000) return 8;
    if (random < 2_500_000) return 5;
    if (random < 5_500_000) return 3.5;
    if (random < 8_000_000) return 2.5;
    if (random < 10_600_000) return 2;
    if (random < 14_200_000) return 1.8;
    if (random < 18_800_000) return 1.6;
    if (random < 25_300_000) return 1.4;
    if (random < 32_500_000) return 1.2;
    return 1;
  }
}
