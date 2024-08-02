import { ExchangeAdapter } from "../exchanges/types";

import { binanceAdapter, kucoinAdapter, uniswapAdapter } from "../exchanges";
import { ISupportedExchanges } from "./types";

export const SUPPORTED_EXCHANGES: ISupportedExchanges= {
    'binance': binanceAdapter,
    'kucoin': kucoinAdapter,
    'uniswap': uniswapAdapter
};