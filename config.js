// Hardcoded contract address — update after deploy.
// Edit address to point this front end at an existing deployment.
window.APP_CONFIG = {
  "address": "0x0000000000000000000000000000000000000000",
  "slug": "tbillchain",
  "name": "TBillChain",
  "accent": "#1f4e79",
  "tagline": "A tokenised T-bill that gains value every day, for verified holders.",
  "about": "Subscribe with the stablecoin to receive tTBILL at the current NAV, which grows at a fixed APR. Only whitelisted addresses can subscribe, redeem or receive transfers. The deployer is whitelisted by default.",
  "tokens": [
    "payToken"
  ],
  "deploy": {
    "tokens": [
      {
        "name": "Mock USD",
        "symbol": "mUSD"
      }
    ],
    "args": [
      "$t0",
      450
    ]
  },
  "stats": [
    {
      "label": "NAV per token",
      "fn": "nav",
      "fmt": "ratio"
    },
    {
      "label": "APR",
      "fn": "aprBps",
      "fmt": "bps"
    },
    {
      "label": "Total supply",
      "fn": "totalSupply",
      "fmt": "token"
    },
    {
      "label": "Payout reserve",
      "fn": "reserve",
      "fmt": "token"
    },
    {
      "label": "Your tTBILL",
      "fn": "balanceOf",
      "fmt": "token",
      "args": [
        "me"
      ]
    },
    {
      "label": "You are whitelisted",
      "fn": "whitelisted",
      "fmt": "bool",
      "args": [
        "me"
      ]
    }
  ],
  "actions": [
    {
      "title": "Subscribe",
      "fn": "subscribe",
      "inputs": [
        {
          "id": "amount",
          "label": "Stablecoin amount",
          "type": "amount",
          "default": "100"
        }
      ]
    },
    {
      "title": "Redeem",
      "fn": "redeem",
      "inputs": [
        {
          "id": "tokens",
          "label": "tTBILL amount",
          "type": "amount",
          "default": "50"
        }
      ]
    },
    {
      "title": "Transfer",
      "fn": "transfer",
      "inputs": [
        {
          "id": "to",
          "label": "Recipient (must be whitelisted)",
          "type": "address",
          "meDefault": false
        },
        {
          "id": "amount",
          "label": "Amount",
          "type": "amount",
          "default": "10"
        }
      ]
    },
    {
      "title": "Fund payout reserve",
      "fn": "fundReserve",
      "desc": "Redemptions above the original deposit are paid from here.",
      "inputs": [
        {
          "id": "amount",
          "label": "Amount",
          "type": "amount",
          "default": "500"
        }
      ]
    },
    {
      "title": "Whitelist an address (owner)",
      "fn": "setWhitelist",
      "inputs": [
        {
          "id": "a",
          "label": "Address",
          "type": "address",
          "meDefault": false
        },
        {
          "id": "ok",
          "label": "Status",
          "type": "bool",
          "options": [
            [
              "true",
              "Allow"
            ],
            [
              "false",
              "Remove"
            ]
          ]
        }
      ]
    }
  ],
  "views": [
    {
      "title": "Is an address whitelisted?",
      "fn": "whitelisted",
      "inputs": [
        {
          "id": "a",
          "label": "Address",
          "type": "address",
          "meDefault": true
        }
      ]
    }
  ]
};
