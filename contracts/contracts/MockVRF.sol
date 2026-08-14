pragma solidity ^0.8.20;

contract MockVRF {
    uint256 public lastRandom;
    uint256 public callCount;

    event RandomnessFulfilled(uint256 indexed requestId, uint256 random);

    function requestRandomness() external returns (uint256 requestId) {
        callCount++;
        lastRandom = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, callCount)));
        emit RandomnessFulfilled(callCount, lastRandom);
        return callCount;
    }

    function getRandom() external view returns (uint256) {
        return lastRandom;
    }
}
