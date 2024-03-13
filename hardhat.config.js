require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/xKr2VMmefc4CME29SG1AgPQCHSU_ohJt",
      accounts: ['be99a3be77e47c2bee28f6e5d470c409dcb0eac80a7de2160e7ead90a264ebba'],
    }
  },
};
