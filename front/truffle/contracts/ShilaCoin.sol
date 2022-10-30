// SPDX-License-Identifier: non
pragma solidity ^0.8.0;

contract ShilaCoin {
    
    mapping (address => uint) balances;
    address owner;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor() {
        owner = msg.sender;
        balances[msg.sender] = 1000000;
    }

    // Returns ownership of contract with wiew (gas free) function for authorization on app.
    function isOwner() public view returns(bool ){
        return msg.sender == owner;
    }

    function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
        if (balances[msg.sender] < amount) return false;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Transfer(msg.sender, receiver, amount);
        return true;
    }

    function getBalance() public view returns(uint) {
        return balances[msg.sender];
    }

    function sendCoinRewards(address[] memory receiver, uint[] memory amount) public {
        require(msg.sender == owner, "You don't have the authority.");
        uint len = receiver.length;

        for(uint i=0; i<len; i++){
            balances[owner] -= amount[i];
            balances[receiver[i]] += amount[i];
        }
    }
}
