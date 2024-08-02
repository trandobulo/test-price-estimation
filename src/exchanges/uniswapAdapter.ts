import { ethers } from 'ethers';
import { ExchangeAdapter } from "./types";
import { UniswapV3FactoryABI, UniswapV3PoolABI } from '../abi/abi';
import { SUPPORTED_CHAINS } from '../config/networks';

import * as env from 'dotenv';
import { IToken } from '../config/types';
env.config();

class UniswapAdapter implements ExchangeAdapter {

    readonly POOL_FEE_TIER = 500
    readonly config = SUPPORTED_CHAINS[Number(process.env.CHAIN_ID)];
    readonly provider = new ethers.JsonRpcProvider(process.env.RPC_API, Number(process.env.CHAIN_ID));

    tickToPrice(tick: BigInt, token0Decimals: number, token1Decimals: number): number {
        const decimalsDiff = token0Decimals - token1Decimals;
        return 1.0001 ** Number(tick) * 10 ** decimalsDiff;
    }

    getToken(tokenSymbol: string): IToken {
        const token = this.config.tokens[tokenSymbol]
        if (!token) throw new Error(`Token ${tokenSymbol} not supported`);

        return token
    }

    async fetchPrice(base: string, quote: string): Promise<number> {

        const factory = new ethers.Contract(this.config.uniswapV3FactoryAddress, UniswapV3FactoryABI, this.provider);

        const baseToken = this.getToken(base);
        const quoteToken = this.getToken(quote);

        const poolAddress = await factory.getPool(baseToken.address, quoteToken.address, this.POOL_FEE_TIER)

        const pool = new ethers.Contract(poolAddress, UniswapV3PoolABI, this.provider);

        const poolToken0 = await pool.token0()
        const { tick } = await pool.slot0();

        if (poolToken0.toLowerCase() === baseToken.address.toLowerCase()) {
            return this.tickToPrice(tick, baseToken.decimals, quoteToken.decimals)
        } else {
            return 1 / this.tickToPrice(tick, quoteToken.decimals, baseToken.decimals)
        }

    }
}

export const uniswapAdapter = new UniswapAdapter()
