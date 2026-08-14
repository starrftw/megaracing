pragma solidity ^0.8.20;

contract MegaRace {
    struct Bet {
        address player;
        bool side;
        uint256 amount;
        uint256 roundId;
    }

    mapping(uint256 => Bet[]) public roundBets;
    mapping(address => uint256) public balances;

    uint256 public currentRoundId;
    uint256 public constant BETTING_WINDOW = 30 seconds;
    uint256 public constant RESOLUTION_WINDOW = 30 seconds;

    event BetPlaced(uint256 indexed roundId, address indexed player, bool side, uint256 amount);
    event RoundResolved(uint256 indexed roundId, bool winningSide, uint256 totalPot);

    function placeBet(uint256 _roundId, bool _side) external payable {
        require(msg.value > 0, "bet must be > 0");
        roundBets[_roundId].push(Bet(msg.sender, _side, msg.value, _roundId));
        emit BetPlaced(_roundId, msg.sender, _side, msg.value);
    }

    function resolve(uint256 _roundId, bool _winningSide) external {
        uint256 totalPot = 0;
        uint256 winnerCount = 0;

        for (uint256 i = 0; i < roundBets[_roundId].length; i++) {
            totalPot += roundBets[_roundId][i].amount;
            if (roundBets[_roundId][i].side == _winningSide) {
                winnerCount++;
            }
        }

        emit RoundResolved(_roundId, _winningSide, totalPot);
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "no balance");
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}
