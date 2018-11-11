pragma solidity ^0.4.0;

contract NestedCounter {

  uint256 _counter;

  function getCounter() public view returns (uint256) {
	return _counter;
  }

  function incrementCounter() public {
	_counter += 1;
  }
}
