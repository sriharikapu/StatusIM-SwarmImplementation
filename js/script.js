    document.addEventListener('DOMContentLoaded', () => {
      web3 = new Web3(new Web3.providers.HttpProvider(/ * ESP */));
      document.getElementById("myButton").addEventListener("click", printAccountBalance);
      function printAccountBalance() {
        var contractAddress = document.getElementById("url").value;
        const abi = [{"constant":true,"inputs":[],"name":"renderWeb","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"}];
        const contract = web3.eth.contract(abi).at(contractAddress);
        const html = contract.renderWeb()
        document.getElementById("display").innerHTML = html
      }
    });
