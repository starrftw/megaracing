import axios from "axios";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart";

export async function getLatestBTC1MinCandle() {
  const now = Math.floor(Date.now() / 1000);
  const from = now - 120;

  const response = await axios.get(COINGECKO_URL, {
    params: {
      vs_currency: "usd",
      from,
      to: now,
    },
  });

  const prices = response.data.prices;
  const last = prices[prices.length - 1];
  const prev = prices[prices.length - 2] ?? last;

  const [prevTime, prevPrice] = prev as [number, number];
  const [lastTime, lastPrice] = last as [number, number];

  return {
    strikePrice: prevPrice,
    resolutionPrice: lastPrice,
    direction: lastPrice >= prevPrice ? "UP" : "DOWN",
    strikeTime: prevTime,
    resolutionTime: lastTime,
  };
}
