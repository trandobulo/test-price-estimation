export interface ExchangeAdapter {
    fetchPrice(base: string, quote: string): Promise<number>
}