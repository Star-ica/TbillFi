// BOT Chain mainnet deployment
window.APP_CONFIG = {
  "address": "0x3CBe4A2fA529cea9e873601Bb724963850e70Aaf",
  "slug": "billfi",
  "name": "BillFi",
  "accent": "#1f4e79",
  "tagline": "A tokenised T-bill that gains value every day, for verified holders.",
  "about": "Subscribe with BOT to receive tTBILL at the current NAV, which grows at a fixed APR. Only whitelisted addresses can subscribe, redeem or receive transfers. The deployer is whitelisted by default.",
  "tokens": [],
  "stats": [
    { "label": "NAV per tTBILL (BOT)", "fn": "nav", "fmt": "ratio" },
    { "label": "APR", "fn": "aprBps", "fmt": "bps" },
    { "label": "Total supply (tTBILL)", "fn": "totalSupply", "fmt": "token" },
    { "label": "Payout reserve (BOT)", "fn": "reserve", "fmt": "token" },
    { "label": "Your tTBILL", "fn": "balanceOf", "fmt": "token", "args": ["me"] },
    { "label": "You are whitelisted", "fn": "whitelisted", "fmt": "bool", "args": ["me"] }
  ],
  "actions": [
    {
      "title": "Subscribe",
      "fn": "subscribe",
      "desc": "Pay BOT, receive tTBILL at the current NAV. Whitelisted wallets only.",
      "valueInput": "amount",
      "inputs": [ { "id": "amount", "label": "BOT to pay", "type": "amount", "default": "100" } ]
    },
    {
      "title": "Redeem",
      "fn": "redeem",
      "desc": "Burn tTBILL and receive BOT at the current NAV.",
      "inputs": [ { "id": "tokens", "label": "tTBILL amount", "type": "amount", "default": "50" } ]
    },
    {
      "title": "Transfer",
      "fn": "transfer",
      "inputs": [
        { "id": "to", "label": "Recipient (must be whitelisted)", "type": "address", "meDefault": false },
        { "id": "amount", "label": "tTBILL amount", "type": "amount", "default": "10" }
      ]
    },
    {
      "title": "Fund payout reserve",
      "fn": "fundReserve",
      "desc": "Adds BOT used to pay the yield on redemptions. It cannot be taken back.",
      "valueInput": "amount",
      "inputs": [ { "id": "amount", "label": "BOT amount", "type": "amount", "default": "500" } ]
    },
    {
      "title": "Whitelist an address (owner)",
      "fn": "setWhitelist",
      "owner": true,
      "inputs": [
        { "id": "a", "label": "Address", "type": "address", "meDefault": false },
        { "id": "ok", "label": "Status", "type": "bool", "options": [["true", "Allow"], ["false", "Remove"]] }
      ]
    }
  ],
  "views": [
    { "title": "Is an address whitelisted?", "fn": "whitelisted", "inputs": [ { "id": "a", "label": "Address", "type": "address", "meDefault": true } ] },
    { "title": "tTBILL balance of an address", "fn": "balanceOf", "fmt": "token", "inputs": [ { "id": "a", "label": "Address", "type": "address", "meDefault": true } ] }
  ]
};