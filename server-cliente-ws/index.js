const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:3000/login ");

ws.onmessage = (event) => {
  console.log(event.data);
  //   process.stdout.write("\033c");
  //   const obj = JSON.parse(event.data);
  //   console.log(`Symbol: ${obj.s}`);
  //   console.log(`Best ask: ${obj.a}`);
  //   console.log(`Best bid: ${obj.b}`);
};

// wss://stream.binance.com:9443/ws/btcbusd@bookTicker
// ws://localhost:3000/login"
