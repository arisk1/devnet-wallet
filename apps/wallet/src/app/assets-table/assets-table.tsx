import type { Holding } from '../data-access/holding';
import { formatUsd } from '../shared/utils/format-usd';

const COLUMNS: (keyof Holding)[] = ['symbol', 'name', 'amount'];
type AssetsTableProps = {
  holdings: Holding[];
};

export function AssetsTable({ holdings }: AssetsTableProps) {
  return (
    <div>
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
