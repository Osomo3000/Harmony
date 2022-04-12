const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');
const hmy = new Harmony(
  // let's assume we deploy smart contract to this end-point URL
  'https://api.s0.b.hmny.io',
  {
    chainType: ChainType.Harmony,
    chainId: ChainID.HmyLocal,
  }
)



// Step 2: get a contract instance
const getContractInstance = (hmy, artifact) => {
  return hmy.contracts.createContract(artifact.abi, address);
}
const inbox = getContractInstance(hmy, inboxJson)

// // Step 3: interact with the instance
// // Example 1: methods.myMethod.call()
// const addDrink = await inbox.methods.message().call();
// console.log(message);

// Example 2: methods.myMethod.send()
inbox.methods.setMessage('666').send({
  gasLimit: '1000001',
  gasPrice: new hmy.utils.Unit('10').asGwei().toWei(),
});