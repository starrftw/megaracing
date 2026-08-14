import { ethers } from "hardhat";

async function main() {
  const [deployer, lp, operator] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const USDC = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

  const MegaRace = await ethers.getContractFactory("MegaRace");
  const race = await MegaRace.deploy(USDC, lp.address, operator.address);
  await race.waitForDeployment();

  console.log("MegaRace deployed to:", await race.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
