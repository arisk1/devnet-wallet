import { AssetsTable } from './assets-table';

export function App() {
  const isEmpty = () => {};

  return (
    <main>
      <h1>Devnet Wallet</h1>
      {HOLDINGS.length <= 0 ? (
        'No tokens yet'
      ) : (
        <AssetsTable holdings={HOLDINGS} />
      )}
    </main>
  );
}

export type Holding = {
  mint: string;
  symbol: string;
  name: string;
  amount: number;
  priceUsd: number;
};

export const HOLDINGS: Holding[] = [
  {
    mint: 'So11111111111111111111111111111111111111112',
    symbol: 'SOL',
    name: 'Solana',
    amount: 12.5,
    priceUsd: 150,
  },
  {
    mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbol: 'USDC',
    name: 'USD Coin',
    amount: 420.69,
    priceUsd: 1,
  },
  {
    mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    symbol: 'JUP',
    name: 'Jupiter',
    amount: 1000,
    priceUsd: 0.5,
  },
  {
    mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    symbol: 'BONK',
    name: 'Bonk',
    amount: 0,
    priceUsd: 0.00002,
  },
];

export default App;
