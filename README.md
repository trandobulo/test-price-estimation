# test-price-estimation

## Description

A Node.js application for price estimation using Uniswap SDKs. This project leverages the Uniswap V3 SDK and core SDK to interact with the Arbitrum network.

## Prerequisites

- Node.js (>=16.x)
- Npm

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/trandobulo/test-price-estimation.git
   cd test-price-estimation
   
2. Install dependencies using Npm:
    
   ```npm install```

3. Create a .env file in the root directory with the following content:
    
    ```
    CHAIN_ID=42161
    RPC_API=https://arb1.arbitrum.io/rpc
    PORT=3000
   
4. Start app:

    ```npm run start```

    in dev mod:
    
    ```npm run  start:dev```
    
    in prod mod:
    
    ```npm run build``` ```npm run prod```

Sample Requests:

1. Estimate Price [GET]
 
Query Parameters:

	•	inputAmount: The amount of the input currency to convert.
	•	inputCurrency: The currency you want to convert from (e.g., BTC).
	•	outputCurrency: The currency you want to convert to (e.g., USDC).

<http://localhost:3000/estimate?inputAmount=1&inputCurrency=BTC&outputCurrency=USDC>

2. Get Rates [GET]

Query Parameters:

	•	baseCurrency: The currency you are converting from (e.g., USDC).
	•	quoteCurrency: The currency you are converting to (e.g., ETH).

<http://localhost:3000/getRates?baseCurrency=USDC&quoteCurrency=ETH>