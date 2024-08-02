import axios from "axios";
import { ExchangeAdapter } from "./types";

class BinanceAdapter implements ExchangeAdapter {
    readonly API_ENDPOINT = 'https://api.binance.com/api/v3/ticker/price';
    readonly INVALID_SYMBOL_ERROR_CODE = -1121;

    async fetchPrice(base: string, quote: string): Promise<number> {
        try {
            const response = await axios.get(`${this.API_ENDPOINT}?symbol=${base}${quote}`);
            return parseFloat(response.data.price);
        } catch (error: any) {
            if (error.response.data.code === this.INVALID_SYMBOL_ERROR_CODE) {
                const repeatResponse = await axios.get(`${this.API_ENDPOINT}?symbol=${quote}${base}`);
                return 1 / parseFloat(repeatResponse.data.price);
            } else {
                throw error
            }
        }
    }
}

export const binanceAdapter = new BinanceAdapter();
