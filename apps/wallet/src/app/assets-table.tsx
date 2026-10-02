import type { Holding } from './app';
import { formatUsd } from './format-usd';
import { Total } from './total';

const COLUMNS: (keyof Holding)[] = ['symbol', 'name', 'amount'];

type AssetsTableProps = {
  holdings: Holding[];
};

export function AssetsTable({ holdings }: AssetsTableProps) {
  return (
    <div>
      <Total holdings={holdings} />
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
    </div>
  );
}
