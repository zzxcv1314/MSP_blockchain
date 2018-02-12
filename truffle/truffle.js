module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
        host: "blkchn4yocxz.koreasouth.cloudapp.azure.com",
        port: 8545,
        gas: 4995119,
        network_id: "*" // Match any network id
    }
}
};
