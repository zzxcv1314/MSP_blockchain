pragma solidity ^0.4.4;

// Declares the contract
contract myCoin {
	
    // This is a mapping that works like a dictionary or associated array in other languages.
    mapping (address => uint) balances;

    // This registers an event
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    // The contract constructor, which is called when the contract is deployed to the blockchain. The contract is persistent on the blockchain, so it remains until it is removed.
    function myCoin() {
        balances[tx.origin] = 100000;
    }

    // This method modifies the blockchain. The sender is required to fuel the transaction in Ether.
    function sendCoin(address receiver, uint amount) returns(bool sufficient) {
        if (balances[msg.sender] < amount) return false;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        Transfer(msg.sender, receiver, amount);
        return true;
    }

    // This method does not modify the blockchain, so it does not require an account to fuel for the call.
    function getBalance(address addr) returns(uint) {
        return balances[addr];
    }
}