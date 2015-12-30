#!/usr/bin/env node
var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
console.log("connected: " + web3.isConnected());
var balance = web3.eth.getBalance(web3.eth.coinbase);
console.log("current balance " + balance.toString(10));
var acc0 = web3.eth.accounts[0];
var acc1 = web3.eth.accounts[1];
console.log("using account " + acc0)

var source   = fs.readFileSync('./registrar.sol', 'utf8')
var compiled = web3.eth.compile.solidity(source)

var reg_code = compiled.Registrar.code
fs.writeFileSync('./regABI.def', JSON.stringify(compiled.Registrar.info.abiDefinition));
var reg_abi  = web3.eth.contract([compiled.Registrar.info.abiDefinition]);

  //TODO: check file 'addr' later
  ///

var cb = function(err, result){
  if (!err) {
    console.log("callback success: " + result );
  } else {
    console.log("callback failed: " + err);
  }
}

var contractAddr = "";
var contractAddr = "0xa12dd513f13052f3376cfc60c9ae0b586f4fa34a"
function interact() {
  console.log(" address " + contractAddr);

  parsedABI = JSON.parse(fs.readFileSync('./regABI.def'))
  console.log("parsing successfull " +  parsedABI.length + " objects ")
  var myReg = web3.eth.contract(parsedABI).at(contractAddr)
  var filter = myReg.itemadded();  
  filter.watch(function(e,r){ if (!e) console.log(r)}) 
  if (!myReg.isRegistered.call({from: acc0})) {
      myReg.register.sendTransaction({from: acc0}, cb)
      myReg.addItem.sendTransaction("one", "one, hi there", {from: acc0})
  }
 var mytext = 'a very long string of text indluding \n some breaks that is definitely \n longer '
 mytext += 'than 32 bytes'
   myReg.addItem.sendTransaction("three", mytext, {from: acc0}, cb)
  myReg.showItems("one", cb);
  myReg.showItems("two", cb);
  myReg.showItems.call("three", cb);
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

