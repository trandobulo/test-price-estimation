import express, { Request, Response } from 'express';
import { estimate, getRates } from './services/service';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/estimate', async (req: Request, res: Response) => {
  const { inputAmount, inputCurrency, outputCurrency } = req.query;
  if (!inputAmount || !inputCurrency || !outputCurrency) {
    return res.status(400).json({ error: 'Missing parameters' });
  }
  try {
    const result = await estimate(parseFloat(String(inputAmount)), String(inputCurrency), String(outputCurrency));
    res.json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/getRates', async (req: Request, res: Response) => {
  const { baseCurrency, quoteCurrency } = req.query;
  if (!baseCurrency || !quoteCurrency) {
    return res.status(400).json({ error: 'Missing parameters' });
  }
  try {
    const result = await getRates(String(baseCurrency), String(quoteCurrency));
    res.json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});