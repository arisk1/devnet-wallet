import { useState } from 'react';
import { AssetsTable } from '../assets-table/assets-table';
import type { Holding } from '../data-access/holding';
import { Total } from '../total/total';

type PortfolioProps = {
  holdings: Holding[];
};

export function Portfolio({ holdings }: PortfolioProps) {
  const [hideZeroBalances, setHideZeroBalances] = useState(false);
  const [sortBy, setSortBy] = useState('highest');
  if (holdings.length === 0) {
    return <div>No tokens yet</div>;
  }

  const nonZeroBalances = holdings.filter((h) => h.amount > 0);
  const balanceFilter = hideZeroBalances ? nonZeroBalances : holdings;
  const filteredHoldings = [...balanceFilter].sort((a, b) => {
    if (sortBy === 'highest') {
      return b.amount * b.priceUsd - a.amount * a.priceUsd;
    }

    return a.symbol.localeCompare(b.symbol);
  });

  return (
    <div>
      <Total holdings={holdings} />
      <label>
        hide zero balances
        <input
          type="checkbox"
          checked={hideZeroBalances}
          onChange={() => setHideZeroBalances(!hideZeroBalances)}
        />
      </label>
      <label htmlFor="sort-select">
        sort by
        <select
          id="sort-select"
          name="sortby"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="highest">Highest First</option>
          <option value="symbol">Symbol</option>
        </select>
      </label>
      <AssetsTable holdings={filteredHoldings} />
    </div>
  );
}
