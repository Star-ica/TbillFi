// ABI of the deployed BillFi contract (native BOT version) on BOT Chain mainnet.
// The empty reserves() and sub() functions are left out on purpose.
window.ARTIFACTS = {
  main: {
    abi: [
      "function name() view returns (string)",
      "function symbol() view returns (string)",
      "function decimals() view returns (uint8)",
      "function aprBps() view returns (uint256)",
      "function startTime() view returns (uint256)",
      "function owner() view returns (address)",
      "function totalSupply() view returns (uint256)",
      "function balanceOf(address) view returns (uint256)",
      "function whitelisted(address) view returns (bool)",
      "function nav() view returns (uint256)",
      "function reserve() view returns (uint256)",
      "function setWhitelist(address account, bool allowed)",
      "function subscribe() payable",
      "function redeem(uint256 tokens)",
      "function transfer(address to, uint256 amount) returns (bool)",
      "function fundReserve() payable",
      "event Transfer(address indexed from, address indexed to, uint256 value)",
      "event Whitelisted(address indexed account, bool allowed)",
      "event Subscribed(address indexed user, uint256 paid, uint256 tokens)",
      "event Redeemed(address indexed user, uint256 tokens, uint256 paid)"
    ]
  }
};