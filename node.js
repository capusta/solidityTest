#!/usr/bin/env node
var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
var balance = web3.eth.getBalance(web3.eth.coinbase)
console.log(balance.toString(10));

var source   = fs.readFileSync('./registrar.sol', 'utf8')
var compiled = web3.eth.compile.solidity(source)

var reg_code = compiled.Registrar.code
fs.writeFileSync('./regABI.def', JSON.stringify(compiled.Registrar.info.abiDefinition));
var reg_abi  = web3.eth.contract([compiled.Registrar.info.abiDefinition]);

  //TODO: check file 'addr' later

var contractAddr = "";
  // var contractAddr = '0x9e2920410887199740e5543231279fde5b173779'

function interact() {
  console.log(" address " + contractAddr);
  fs.writeFileSync('./addr', contractAddr);

  parsedABI = JSON.parse(fs.readFileSync('./regABI.def')).abi
  console.log("parsing successfull " parsedABI.length )
  var myReg = web3.eth.contract(parsedABI).at(contractAddr)

  console.log("calling register");
  console.log(myReg.register.call())
  console.log(myReg.showItems.call())
}


var mycoin = coinabi.new({from: web3.eth.accounts[0], data: reg_code, gas: 1000000}, function(e, contract) {
  if (!e && contract.address) {
    console.log("mined: " + contract.address)
    contractAddr = contract.address
    interact();
  } else if { !e && contract.transactionHash) {
    console.log(" mining ");
  } else {
    console.log("error ccured " + e)
  }
})

