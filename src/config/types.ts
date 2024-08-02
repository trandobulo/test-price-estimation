import { ExchangeAdapter } from "../exchanges/types"

export interface IToken { address: string, decimals: number }

export interface IChainConfig {
    [key: number]: {
        tokens: { [key: string]: IToken },
        uniswapV3FactoryAddress: string
    }
}

export interface ISupportedExchanges { [key: string]: ExchangeAdapter } 