pragma solidity ^0.4.0;

contract ConfidentialCounter {

  uint256 _counter;

  function count() public view returns (uint256) {
	return _counter;
  }

  function increment() public {
	_counter += 1;
  }
}
