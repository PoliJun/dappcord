const { expect } = require("chai");
const { describe, it, beforeEach } = require("mocha");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Dappcord", () => {
    let deployer, user;
    let dappcord;

    const NAME = "Dappcord";
    const SYMBOL = "DC";
    beforeEach(async () => {
        [deployer, user] = await ethers.getSigners();
        const Dappcord = await ethers.getContractFactory("Dappcord");
        dappcord = await Dappcord.deploy(NAME, SYMBOL);
        await dappcord.deployed();
    });
    describe("Deployment", () => {
        it("Sets the name", async () => {
            const name = await dappcord.name();
            expect(name).to.equal("Dappcord");
        });
        it("Sets the symbol", async () => {
            const symbol = await dappcord.symbol();
            expect(symbol).to.equal("DC");
        });
        it('Sets the owner', async () => {
            const owner = await dappcord.owner();
            expect(owner).to.equal(deployer.address);
        });
    });
});
