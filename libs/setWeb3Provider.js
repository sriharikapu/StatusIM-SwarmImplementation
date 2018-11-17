/**
Function/Module Name : setWeb3Provider
Purpose : A function to set a transaction signer provider and attach to web3
Input: provider, keystore
Output : new setWeb3Provider;
**/
var Web3 = require('web3');
const provider = require('./provider');
var HookedWeb3Provider = require("hooked-web3-provider");
function setWeb3Provider(keystore)
      {
        var web3 = new Web3(new Web3.providers.HttpProvider(provider));
        var web3Provider = new HookedWeb3Provider({
          host: provider,
          transaction_signer: keystore
        });

        web3.setProvider(web3Provider);
      }

 module.exports = setWeb3Provider;
