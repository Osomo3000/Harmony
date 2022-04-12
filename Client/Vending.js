const Web3 = require('web3');
const BN = require('bn.js');


HMY_PRIVATE_KEY = '8ca83b015099d30479c3bde82b73ba914c307110332f94d754d9e3e2eb91f75a';
HMY_TESTNET_RPC_URL = 'https://api.s0.b.hmny.io';

const web3 = new Web3(HMY_TESTNET_RPC_URL);

let hmyMasterAccount = web3.eth.accounts.privateKeyToAccount(HMY_PRIVATE_KEY);
web3.eth.accounts.wallet.add(hmyMasterAccount);
web3.eth.defaultAccount = hmyMasterAccount.address


async function main() {

    const accounts = await web3.eth.getAccounts();
    const address = '0xa8c4cbE765B5A25c741c68376F8f37637aade4cA';

 
    const abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_size",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_price",
                    "type": "string"
                }
            ],
            "name": "addDrink",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "buy",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "customer",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "customers",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "drinks",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "size",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "price",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_index",
                    "type": "uint256"
                }
            ],
            "name": "getDrinkList",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "size",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "price",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "manager",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ]

    const gasPrice = await web3.eth.getGasPrice(); 
    const vending = await new web3.eth.Contract(abi, address);
    //const balance = await web3.eth.getBalance(accounts[0]);


    await vending.methods.addDrink('Cola','0.5 L', '2 EUR');

    //list = await vending.methods.getDrinkList(0).call();
     
    //console.log(list);


  }
  
  main();