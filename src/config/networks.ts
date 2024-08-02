import { IChainConfig } from "./types";

export const SUPPORTED_CHAINS: IChainConfig = {
    42161: {
        tokens: {
            'ETH': { address: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1', decimals: 18 }, // WETH
            'BTC': { address: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f', decimals: 8 }, // WBTC
            'USDT': { address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', decimals: 6 },
            'USDC': { address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', decimals: 6 } // USDC.e
        },
        uniswapV3FactoryAddress: '0x1F98431c8aD98523631AE4a59f267346ea31F984'
    }
}