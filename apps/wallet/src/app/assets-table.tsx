import type { Holding } from './app';

const COLUMNS: (keyof Holding)[] = [
  'symbol',
  'name',
  'amount',
  'priceUsd',
];

type AssetsTableProps = {
  holdings: Holding[];
};

export function AssetsTable({ holdings }: AssetsTableProps) {
  return (
    <table>
      <thead>
        <tr>
          {COLUMNS.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {holdings.map((holding) => (
          <tr key={holding.mint}>
            {COLUMNS.map((column) => (
              <td key={column}>{holding[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
