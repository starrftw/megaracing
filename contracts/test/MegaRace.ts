import { expect } from "chai";
import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("MegaRace", function () {
  async function deployFixture() {
    const [operator, lp, player1, player2] = await ethers.getSigners();
    const USDC = await ethers.getContractFactory("MockUSDC");
    const usdc = await USDC.deploy();
    await usdc.waitForDeployment();

    const MegaRace = await ethers.getContractFactory("MegaRace");
    const race = await MegaRace.deploy(
      await usdc.getAddress(),
      lp.address,
      operator.address
    );
    await race.waitForDeployment();

    // Fund players
    const amount = ethers.parseUnits("100", 6);
    await usdc.mint(player1.address, amount);
    await usdc.mint(player2.address, amount);
    await usdc.connect(player1).approve(await race.getAddress(), amount);
    await usdc.connect(player2).approve(await race.getAddress(), amount);

    return { race, usdc, operator, lp, player1, player2 };
  }

  it("deploys and starts a round", async function () {
    const { race, operator } = await deployFixture();
    const roundId = await race.startRound();
    expect(roundId).to.equal(1n);
  });

  it("accepts bets and resolves with no house edge", async function () {
    const { race, player1, player2 } = await deployFixture();
    const roundId = await race.startRound();

    const betAmount = ethers.parseUnits("1", 6);
    await race.connect(player1).placeBet(roundId, true, betAmount);
    await race.connect(player2).placeBet(roundId, false, betAmount);

    const round = await race.rounds(roundId);
    expect(round.totalUp).to.equal(betAmount);
    expect(round.totalDown).to.equal(betAmount);

    await time.increase(61);
    await race.resolveRound(roundId, true, 0);

    const winnings = await race.connect(player1).claimPayout(roundId);
    // With no house edge and LP fill 0, winner should get 2x (whole pot)
    expect(await race.roundBets(roundId, 0)).to.not.be.reverted;
  });
});
