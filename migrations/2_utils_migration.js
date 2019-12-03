const Utils = artifacts.require("Utils");

module.exports = function(deployer) {
  deployer.deploy(Utils);
};
