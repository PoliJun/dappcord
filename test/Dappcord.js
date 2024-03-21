const { expect } = require("chai");
const { describe, it, beforeEach } = require("mocha");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Dappcord", () => {
    describe("Deployment", async () => {
        it("Sets the name", async () => {
            const Dappcord = await ethers.getContractFactory("Dappcord");
            const dappcord = await Dappcord.deploy("Dappcord", "DC");
            await dappcord.deployed();
            const name = await dappcord.name();
            const symbol = await dappcord.symbol();
            expect(name).to.equal("Dappcord");
            expect(symbol).to.equal("DC");
        });
    });
});
