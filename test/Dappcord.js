const { expect } = require("chai");
const { describe, it, beforeEach } = require("mocha");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), "ether");
};
// console.log(tokens(1)) // 1000000000000000000

describe("Dappcord", () => {
    let deployer, user;
    let dappcord;
    let transaction;

    const NAME = "Dappcord";
    const SYMBOL = "DC";
    beforeEach(async () => {
        [deployer, user] = await ethers.getSigners();
        const Dappcord = await ethers.getContractFactory("Dappcord");
        dappcord = await Dappcord.deploy(NAME, SYMBOL);
        await dappcord.deployed();

        // create a channel
        transaction = await dappcord
            .connect(deployer)
            .createChannel("General", tokens(1));
        await transaction.wait();
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
        it("Sets the owner", async () => {
            const owner = await dappcord.owner();
            expect(owner).to.equal(deployer.address);
        });
    });
    describe("Create a channel", () => {
        it("Returns total channels", async () => {
            const totalChannels = await dappcord.totalChannels();
            expect(totalChannels).to.equal(1);
        });
        it("Returns the channel attributes", async () => {
            const channel = await dappcord.channels(1);
            expect(channel.id).to.equal(1);
            expect(channel.name).to.equal("General");
            expect(channel.cost).to.equal(tokens(1));
        });
    });
});
