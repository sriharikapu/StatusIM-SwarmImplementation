const contractAddress = require('./libs/contractAddress');
var Web3 = require('web3');
var web3 = new Web3();
const contractAbi = require('./libs/contractAbi');
const provider = require('./libs/provider');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // Set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider(provider));
}

var contract = web3.eth.contract(contractAbi).at(contractAddress);


function renderContract() {
    contract.renderHeader(function(error,data){
    console.log("error : " + error + ", data : " + data);
  });
}

function setHeader() {
  var headerVar = "";
  contract.Header(headerVar, (function(error,hash){
    console.log("error : " + error + ", hash : " + hash);
  });
}
