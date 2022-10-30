const ShilaCoin = artifacts.require("ShilaCoin");

module.exports = function(deployer) {
  deployer.deploy(ShilaCoin);
};
