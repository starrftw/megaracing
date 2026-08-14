// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MegaRace is ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable usdc;

    struct Round {
        uint256 id;
        uint256 startTime;
        uint256 endTime;
        bool resolved;
        bool winningSide;
        uint256 totalUp;
        uint256 totalDown;
        uint256 lpProvided;
    }

    struct Bet {
        address player;
        bool side;
        uint256 amount;
        uint256 roundId;
        bool claimed;
    }

    mapping(uint256 => Round) public rounds;
    mapping(uint256 => Bet[]) public roundBets;

    uint256 public currentRoundId;
    uint256 public constant ROUND_DURATION = 1 minutes;

    address public lpWallet;
    address public operator;

    event BetPlaced(uint256 indexed roundId, address indexed player, bool side, uint256 amount);
    event RoundResolved(
        uint256 indexed roundId,
        bool winningSide,
        uint256 totalPot,
        uint256 lpProvided
    );
    event PayoutClaimed(uint256 indexed roundId, address indexed player, uint256 amount);
    event HonksAwarded(address indexed player, uint256 amount);

    modifier onlyOperator() {
        require(msg.sender == operator, "only operator");
        _;
    }

    constructor(address _usdc, address _lpWallet, address _operator) {
        usdc = IERC20(_usdc);
        lpWallet = _lpWallet;
        operator = _operator;
    }

    function startRound() external onlyOperator returns (uint256) {
        currentRoundId++;
        uint256 roundId = currentRoundId;

        Round storage newRound = rounds[roundId];
        newRound.id = roundId;
        newRound.startTime = block.timestamp;
        newRound.endTime = block.timestamp + ROUND_DURATION;
        newRound.resolved = false;

        return roundId;
    }

    function placeBet(uint256 _roundId, bool _side, uint256 _amount)
        external
        nonReentrant
    {
        Round storage round = rounds[_roundId];
        require(block.timestamp >= round.startTime, "not started");
        require(block.timestamp < round.endTime, "betting closed");
        require(!round.resolved, "round resolved");
        require(_amount > 0, "bet must be > 0");

        usdc.safeTransferFrom(msg.sender, address(this), _amount);

        roundBets[_roundId].push(
            Bet(msg.sender, _side, _amount, _roundId, false)
        );

        if (_side) {
            round.totalUp += _amount;
        } else {
            round.totalDown += _amount;
        }

        emit BetPlaced(_roundId, msg.sender, _side, _amount);
    }

    function resolveRound(uint256 _roundId, bool _winningSide, uint256 _lpFill)
        external
        onlyOperator
    {
        Round storage round = rounds[_roundId];
        require(!round.resolved, "already resolved");
        require(block.timestamp >= round.endTime, "round not ended");

        round.resolved = true;
        round.winningSide = _winningSide;
        round.lpProvided = _lpFill;

        if (_winningSide) {
            round.totalDown += _lpFill;
        } else {
            round.totalUp += _lpFill;
        }

        uint256 totalPot = round.totalUp + round.totalDown;

        emit RoundResolved(_roundId, _winningSide, totalPot, _lpFill);
    }

    function claimPayout(uint256 _roundId) external nonReentrant {
        Round storage round = rounds[_roundId];
        require(round.resolved, "not resolved");

        uint256 winningPot = round.winningSide ? round.totalUp : round.totalDown;
        uint256 totalPot = round.totalUp + round.totalDown;

        uint256 totalWinningBet = 0;
        for (uint256 i = 0; i < roundBets[_roundId].length; i++) {
            Bet storage bet = roundBets[_roundId][i];
            if (
                bet.player == msg.sender &&
                !bet.claimed &&
                bet.side == round.winningSide
            ) {
                totalWinningBet += bet.amount;
                bet.claimed = true;
            }
        }

        require(totalWinningBet > 0, "no winning bets");

        uint256 payout = (totalWinningBet * totalPot) / winningPot;

        usdc.safeTransfer(msg.sender, payout);

        emit PayoutClaimed(_roundId, msg.sender, payout);
    }

    function awardHonks(address _player, uint256 _amount) external onlyOperator {
        emit HonksAwarded(_player, _amount);
    }

    function withdrawSurplus(uint256 amount) external onlyOperator {
        usdc.safeTransfer(operator, amount);
    }
}
