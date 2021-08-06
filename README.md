# project-top-cryptos


## Start Up the Local Server

The local crypto data is stored in the `db.json` file. You'll want to access this data using a JSON server. Run `json-server --watch db.json` to start the server.

This will create a server storing all of our local crypto data with restful routes at `http://localhost:3000/crypto`. You can also check out the information for each individual cryptocurrency at `http://localhost:3000/crypto/:id`.

> **Note:** we are using `:id` here as a variable value that indicates the path to a specific cryptocurrency. To navigate (or send a request) to that path, the `id` number will be inserted into the URL in place of `:id`, e.g., `http://localhost:3000/crypto/1`

Open a second tab in the terminal then open `index.html` in the browser and take a look at the page. The CSS has all been provided for you so that, when you create the displays for each cryptocurrency, you just need to add a CSS class to style them.

## External API Information

https://blog.chain.link/introducing-the-chainlink-feed-registry/

CoinGecko:
BANK token is listed as "bankless-dao" in the url:
https://www.coingecko.com/en/coins/bankless-dao
