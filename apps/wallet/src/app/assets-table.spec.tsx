import { render, screen, within } from '@testing-library/react';

import type { Holding } from './app';
import { AssetsTable } from './assets-table';

const holdings: Holding[] = [
  { mint: 'mint-a', symbol: 'AAA', name: 'Token A', amount: 2, priceUsd: 10 },
  { mint: 'mint-b', symbol: 'BBB', name: 'Token B', amount: 3, priceUsd: 1 },
];

describe('AssetsTable', () => {
  it('should render one row per holding', () => {
    render(<AssetsTable holdings={holdings} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(2);
  });

  it('should render a holding with its USD value in the last cell', () => {
    render(<AssetsTable holdings={holdings} />);
    const [firstRow] = screen.getAllByRole('row');
    const cells = within(firstRow)
      .getAllByRole('cell')
      .map((td) => td.textContent);
    expect(cells).toEqual(['AAA', 'Token A', '2', '$20.00']);
  });
});
