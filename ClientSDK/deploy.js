const { ContractFactory } = require('@harmony-js/contract');
const { Wallet } = require('@harmony-js/account');
const { Messenger, HttpProvider } = require('@harmony-js/network');
const { ChainID, ChainType, hexToNumber } = require('@harmony-js/utils');
const perf = require('execution-time')();
const wallet = new Wallet(
  new Messenger(
    new HttpProvider('https://api.s0.b.hmny.io'),
    ChainType.Harmony,
    ChainID.HmyTestnet,
  ),
);
const factory = new ContractFactory(wallet);

const contractJson = require("./vending.json");
const contract = factory.createContract(contractJson.abi);

const options1 = { gasPrice: '0x3B9ACA00' }; // gas price in hex corresponds to 1 Gwei or 1000000000
let options2 = { gasPrice: 50000000000, gasLimit: 21000 }; // setting the default gas limit, but changing later based on estimate gas

const options3 = { data: contractJson.bytecode }; // contractConstructor needs contract bytecode to deploy

contract.wallet.addByPrivateKey('8ca83b015099d30479c3bde82b73ba914c307110332f94d754d9e3e2eb91f75a');

perf.start();
contract.methods.contractConstructor(options3).estimateGas(options1).then(gas => {
  options2 = {...options2, gasLimit: hexToNumber(gas)};
  contract.methods.contractConstructor(options3).send(options2).then(response => {
    console.log('contract deployed at ' + response.transaction.receipt.contractAddress);
    const results = perf.stop();
    console.log(results.time);  // in milliseconds
  });
});