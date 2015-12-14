#!/usr/bin/env node
console.log("test")

var Web3 = require('web3');
var web3 = new Web3();
var fs = require('fs');

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
var coinbase = web3.eth.coinbase


var balance = web3.eth.getBalance(coinbase)
console.log(balance.toString(10));
var coin = fs.readFileSync('./coin.sol', 'utf8')

var compiled_coin = web3.eth.compile.solidity(coin)
console.log(compiled_coin.Coin.info.abiDefinition)
var coincode = compiled_coin.Coin.code
var CoinContract = web3.eth.contract(compiled_coin.Coin.info.abiDefinition);
fs.writeFileSync('./coinABI.sol', JSON.stringify(CoinContract));

var contractAddr = "";
function keepgoing() {
  console.log("final address is " + contractAddr)
  myCoin = web3.eth.contract(CoinContract).at(contractAddr)
  console.log(myCoin.greet("hey there"))

}
var mycoin = CoinContract.new({from: web3.eth.accounts[0], data: compiled_coin.Coin.code, gas: 1000000}, function(e, contract) {
  if (!e && contract.address) {
    console.log("done: " + contract.transactionHash)
    console.log("mined: " + contract.address)
    contractAddr = contract.address
    keepgoing();
  } else {
    console.log("error ccured " + e)
  }
})

