// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title TBillChain - yield-bearing tokenised T-bill using native BOT.
contract TBillChain {
    string public constant name = "Tokenized T-Bill";
    string public constant symbol = "tTBILL";
    uint8 public constant decimals = 18;

    uint256 public immutable aprBps;
    uint256 public immutable startTime;
    address public owner;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => bool) public whitelisted;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Whitelisted(address indexed account, bool allowed);
    event Subscribed(address indexed user, uint256 paid, uint256 tokens);
    event Redeemed(address indexed user, uint256 tokens, uint256 paid);

    modifier onlyOwner() { require(msg.sender == owner, "owner only"); _; }

    constructor(uint256 _aprBps) {
        aprBps = _aprBps;
        startTime = block.timestamp;
        owner = msg.sender;
        whitelisted[msg.sender] = true;
    }

    receive() external payable {}

    function nav() public view returns (uint256) {
        return 1e18 + (1e18 * aprBps * (block.timestamp - startTime)) / (365 days * 10000);
    }
    function reserve() external view returns (uint256) { return address(this).balance; }

    function setWhitelist(address account, bool allowed) external onlyOwner {
        whitelisted[account] = allowed;
        emit Whitelisted(account, allowed);
    }

    function subscribe() external payable {
        require(whitelisted[msg.sender], "not whitelisted");
        uint256 tokens = (msg.value * 1e18) / nav();
        require(tokens > 0, "too small");
        totalSupply += tokens;
        balanceOf[msg.sender] += tokens;
        emit Transfer(address(0), msg.sender, tokens);
        emit Subscribed(msg.sender, msg.value, tokens);
    }

    function redeem(uint256 tokens) external {
        require(whitelisted[msg.sender], "not whitelisted");
        require(tokens > 0 && balanceOf[msg.sender] >= tokens, "balance");
        uint256 payAmount = (tokens * nav()) / 1e18;
        require(address(this).balance >= payAmount, "reserve low");
        balanceOf[msg.sender] -= tokens;
        totalSupply -= tokens;
        (bool ok,) = msg.sender.call{value: payAmount}("");
        require(ok, "transfer");
        emit Transfer(msg.sender, address(0), tokens);
        emit Redeemed(msg.sender, tokens, payAmount);
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(whitelisted[msg.sender] && whitelisted[to], "not whitelisted");
        require(balanceOf[msg.sender] >= amount, "balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function fundReserve() external payable {
        require(msg.value > 0, "zero");
    }
}