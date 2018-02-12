var myCoin = artifacts.require("./myCoin.sol");

module.exports = function(deployer) {
    deployer.deploy(myCoin);
};