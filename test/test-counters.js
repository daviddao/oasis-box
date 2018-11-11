const Counter = artifacts.require("Counter");
const NestedCounter = artifacts.require("NestedCounter");
const ConfidentialCounter = artifacts.require("ConfidentialCounter");
const WasmCounter = artifacts.requir("WasmCounter");
const NestedWasmCounter = artifacts.requir("NestedWasmCounter");
const ConfidentialWasmCounter = artifacts.requir("ConfidentialWasmCounter");

const Web3c = require("web3c");
// use the provider set in our truffle-config.js
const web3c = new Web3c(Counter.web3.currentProvider);

/**
 * Tests all the example contracts with one test suite. The actual tests are
 * exactly the same whether the contract is Rust, Solidity, confidential or not.
 * All that matters is that we construct the correct web3c contract object.
 */
contract("Solidity Counters", (accounts) => {

  const options = { from: accounts[0] };
  const contracts = [
    new web3c.eth.Contract(Counter.abi, Counter.address, options),
    new web3c.eth.Contract(NestedCounter.abi, Counter.address, options),
    new web3c.confidential.Contract(ConfidentialCounter.abi, Counter.address, options),
    new web3c.eth.Contract(WasmCounter.abi, Counter.address, options),
    new web3c.eth.Contract(NestedWasmCounter.abi, Counter.address, options),
    new web3c.confidential.Contract(ConfidentialWasmCounter.abi, Counter.address, options)
  ];

  contracts.forEach((contract) => {
    it("should have a starting count of 0", async () => {
      const count = await contract.methods.count().call();
      assert.equal(count, 0);
    });

    it("should increment the count to 1", async () => {
      await contract.methods.increment().send();
      const count = await contract.methods.count().call();
      assert.equal(count, 1);
    });
  });
});
