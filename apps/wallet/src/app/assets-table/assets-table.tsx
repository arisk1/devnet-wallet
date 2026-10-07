import type { Holding } from '../data-access/holding';
import { formatUsd } from '../shared/utils/format-usd';
import { useState } from 'react';

const COLUMNS: (keyof Holding)[] = ['symbol', 'name', 'amount'];

type AssetsTableProps = {
  holdings: Holding[];
};

export function AssetsTable({ holdings }: AssetsTableProps) {
  const [hideZeroBalances, setHideZeroBalances] = useState(false);
  const [sortBy, setSortBy] = useState('highest');

  const tableRows = () => {
    const nonZeroBalances = holdings.filter((h) => h.amount * h.priceUsd > 0);
    const balanceFilter = hideZeroBalances ? nonZeroBalances : holdings;
    const filteredRows = [...balanceFilter].sort((a, b) => {
      if (sortBy === 'highest') {
        return b.amount * b.priceUsd - a.amount * a.priceUsd;
      }

      return a.symbol.localeCompare(b.symbol);
    });

    return (
      <>
        {filteredRows.map((holding) => (
          <tr key={holding.mint}>
            {COLUMNS.map((column) => (
              <td key={column}>{holding[column]}</td>
            ))}
            <td>{formatUsd(holding.amount * holding.priceUsd)}</td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <div>
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
      <table>
        <tbody>{tableRows()}</tbody>
      </table>
    </div>
  );
}
