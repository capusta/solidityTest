#!/usr/bin/env node
var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
console.log("connected: " + web3.isConnected());
var balance = web3.eth.getBalance(web3.eth.coinbase);
console.log("current balance " + balance.toString(10));
var acc0 = web3.eth.accounts[0];
console.log("using account " + acc0)

var source   = fs.readFileSync('./registrar.sol', 'utf8')
var compiled = web3.eth.compile.solidity(source)

var reg_code = compiled.Registrar.code
fs.writeFileSync('./regABI.def', JSON.stringify(compiled.Registrar.info.abiDefinition));
var reg_abi  = web3.eth.contract([compiled.Registrar.info.abiDefinition]);

  //TODO: check file 'addr' later

var cb = function(err, result){
  if (!err) {
    console.log("callback success: " + result );
  } else {
    console.log("callback failed: " + err);
  }
}

var contractAddr = "";
//var contractAddr = "0x2a1150a0b20c3c94e8b28169192cccd1c25a8614";
function interact() {
  console.log(" address " + contractAddr);

  parsedABI = JSON.parse(fs.readFileSync('./regABI.def'))
  console.log("parsing successfull " +  parsedABI.length + " objects ")
  var myReg = web3.eth.contract(parsedABI).at(contractAddr)

  myReg.register.sendTransaction({from: acc0}, cb)
  myReg.addItem.sendTransaction("one",{from: acc0})
  myReg.addItem.call("one",{from: acc0}, cb);
  myReg.showItems.sendTransaction({from: acc0}, cb);
  myReg.showItems.call({from: acc0}, cb);
}

if (contractAddr != "") { interact(); }
else {
  var mycoin = reg_abi.new({from: web3.eth.accounts[0], data: reg_code, gas: 1000000}, function(e, contract) {
    if (!e && contract.address) {
      console.log("mined: " + contract.address)
      contractAddr = contract.address
      interact();
    } else if (!e && contract.transactionHash) {
      console.log(" mining ");
    } else {
      console.log("error ccured " + e)
    }
  })
}

