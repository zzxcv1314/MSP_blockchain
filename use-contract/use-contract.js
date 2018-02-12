var Web3 = require("web3");

var AzureBlockchainRPC = "http://blkchn4yocxz.koreasouth.cloudapp.azure.com:8545";
var account1 = "0x4E2444C0cE8B1bf705611CC440b23F39d97F1AFc";
var contractAddress = "0xc6cc582afb464bbeb1becc9aaa3f0fee2556bff5";

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(AzureBlockchainRPC));

// The abi object defines the contract interface. Web3 uses this to build the contract interface.
var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}]');

let myCoinContract = web3.eth.contract(abi);
let myCoinInstance = myCoinContract.at(contractAddress);

// This sets up a listener for the Transfer event.
var transferEvent = myCoinInstance.Transfer( {}, {fromBlock: 0, toBlock: 'latest'});

// Watching for transfer.... 
transferEvent.watch(function(error, result) {
    if (!error) {
        console.log("Coin Sent!\n\nChecking balance for coin base...");
        console.log(myCoinInstance.getBalance.call(web3.eth.coinbase));
        console.log("Checking balance for account1...");
        console.log(myCoinInstance.getBalance.call(account1));
    }
    else {
        console.log("An error occurred.");
        console.log(error);
    }
    process.exit();
});

web3.eth.defaultAccount = web3.eth.coinbase;
console.log("Sending some coin...");
console.log(myCoinInstance.sendCoin(account1, 1000, {from: web3.eth.coinbase}));

console.log("Checking balance for coin base...")
console.log(myCoinInstance.getBalance.call(web3.eth.coinbase));

console.log("Checking balance for account1...")
console.log(myCoinInstance.getBalance.call(account1));

console.log("Waiting for event to fire...");