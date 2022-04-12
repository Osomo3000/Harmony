const { ContractFactory } = require('@harmony-js/contract');
const { Wallet } = require('@harmony-js/account');
const { Messenger, HttpProvider } = require('@harmony-js/network');
const { ChainID, ChainType, hexToNumber } = require('@harmony-js/utils');

const wallet = new Wallet(new Messenger(
  new HttpProvider('https://api.s0.b.hmny.io'),
  ChainType.Harmony,
  ChainID.HmyTestnet,
));

wallet.setSigner("0x6ff35b3a37d8B2A9918ECCeA73B4A698588C1922");
const perf = require('execution-time')();

const contractJson = require("./vending.json");
//const contractAddr = "0x17D3BD54d5c93646823E00A134B5C7FE6FDda48B";
const contractAddr = "0x33419039c98ccc58467e83f5c0bdf16aba00bc54";

const factory = new ContractFactory(wallet);
const contract = factory.createContract(contractJson.abi, contractAddr);

contract.wallet.addByPrivateKey('8ca83b015099d30479c3bde82b73ba914c307110332f94d754d9e3e2eb91f75a');

const options1 = { gasPrice: '0x3B9ACA00' }; // gas price in hex corresponds to 1 Gwei or 1000000000
let options2 = { gasPrice: 100000000000, gasLimit: 21000000 }; // setting the


  contract.methods.addDrink("Coca Cola","0.5 L", "2 EUR").estimateGas(options1).then(gas => {
    options2 = {...options2, gasLimit: hexToNumber(gas)};
    contract.methods.addDrink("Coca Cola","0.5 L", "2 EUR").send(options2).then(response => {
      console.log(response.transaction.receipt);
      
    });
  });

contract.methods.getDrinkList(0).estimateGas(options1).then(gas => {
  options2 = {...options2, gasLimit: hexToNumber(gas)};
 let drink = contract.methods.getDrinkList(0)
    console.log(drink);
});

