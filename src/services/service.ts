import { RateResult, EstimateResult } from './types'
import { SUPPORTED_EXCHANGES } from '../config';

export async function fetchPrice(exchange: string, base: string, quote: string): Promise<number> {
    try {
        const exchangeAdapter = SUPPORTED_EXCHANGES[exchange];

        if (!exchangeAdapter) throw new Error('Exchange not supported');

        return await exchangeAdapter.fetchPrice(base, quote);
    } catch (error: any) {
        throw new Error(`Error fetching price from ${exchange}: ${error.message}`);
    }
};

export async function estimate(inputAmount: number, inputCurrency: string, outputCurrency: string): Promise<EstimateResult> {
    const rates = await Promise.all(
        Object.values(SUPPORTED_EXCHANGES).map(exchange => exchange.fetchPrice(inputCurrency, outputCurrency))
    );

    const bestRate = Math.max(...rates);
    const bestExchange = Object.keys(SUPPORTED_EXCHANGES)[rates.indexOf(bestRate)];
    const outputAmount = inputAmount * bestRate;

    return {
        exchangeName: bestExchange,
        outputAmount: outputAmount
    };
};

export async function getRates(baseCurrency: string, quoteCurrency: string): Promise<RateResult[]> {
    const rates = await Promise.all(
        Object.keys(SUPPORTED_EXCHANGES).map(async exchange => {
            const rate = await SUPPORTED_EXCHANGES[exchange].fetchPrice(baseCurrency, quoteCurrency);
            return {
                exchangeName: exchange,
                rate: rate
            };
        })
    );

    return rates;
};