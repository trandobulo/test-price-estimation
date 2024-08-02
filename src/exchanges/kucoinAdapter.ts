import axios from "axios";
import { ExchangeAdapter } from "./types";

class KucoinAdapter implements ExchangeAdapter {
    readonly API_ENDPOINT = 'https://api.kucoin.com/api/v1/market/orderbook/level1'

    async fetchPrice(base: string, quote: string): Promise<number> {
        const response = await axios.get(`${this.API_ENDPOINT}?symbol=${base}-${quote}`);

        if (!response.data.data) {
            const repeatResponse = await axios.get(`${this.API_ENDPOINT}?symbol=${quote}-${base}`);
            return 1 / parseFloat(repeatResponse.data.data.price);
        }

        return parseFloat(response.data.data.price);
    }
}

export const kucoinAdapter = new KucoinAdapter(); 