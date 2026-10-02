import type { Holding } from './app';
import { formatUsd } from './format-usd';

const COLUMNS: (keyof Holding)[] = ['symbol', 'name', 'amount'];

type AssetsTableProps = {
  holdings: Holding[];
};

export function AssetsTable({ holdings }: AssetsTableProps) {
  return (
    <table>
      <tbody>
        {holdings.map((holding) => (
          <tr key={holding.mint}>
            {COLUMNS.map((column) => (
              <td key={column}>{holding[column]}</td>
            ))}
            <td>{formatUsd(holding.amount * holding.priceUsd)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
