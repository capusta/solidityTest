#!/usr/bin/env node
console.log("test")

var Web3 = require('web3');
var web3 = new Web3();
var fs = require('fs');

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
var balance = web3.eth.getBalance(web3.eth.coinbase)
console.log(balance.toString(10));

var coin = fs.readFileSync('./coin.sol', 'utf8')
var compiled_coin = web3.eth.compile.solidity(coin)

var coincode = compiled_coin.Coin.code
var coinabi  = web3.eth.contract(compiled_coin.Coin.info.abiDefinition);
fs.writeFileSync('./coinABI.sol', JSON.stringify(coinabi));

var contractAddr = "";

function keepgoing() {
  console.log("final address is " + contractAddr)
  //parsedABI = JSON.parse(web3.admin.getContractInfo(contractAddr));
  parsedABI = JSON.parse(fs.readFileSync('./coinABI.sol')).abi
  console.log("parsing successfull " + parsedABI)
  // var contractAddr = '0x9e2920410887199740e5543231279fde5b173779'
  var myCoin = web3.eth.contract(parsedABI).at(contractAddr)
  //console.log(JSON.stringify(myCoin.abi));
  console.log("calling greeting")
  console.log(myCoin.greet.call("hey there"))
  console.log(myCoin.unknown.call())
}
var mycoin = coinabi.new({from: web3.eth.accounts[0], data: compiled_coin.Coin.code, gas: 1000000}, function(e, contract) {
  if (!e && contract.address) {
    console.log("done: " + contract.transactionHash)
    console.log("mined: " + contract.address)
    contractAddr = contract.address
    keepgoing();
  } else {
    console.log("error ccured " + e)
  }
})

