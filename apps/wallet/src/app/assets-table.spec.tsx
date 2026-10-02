import { render, screen, within } from '@testing-library/react';

import type { Holding } from './app';
import { AssetsTable } from './assets-table';

const holdings: Holding[] = [
  { mint: 'mint-a', symbol: 'AAA', name: 'Token A', amount: 2, priceUsd: 10 },
  { mint: 'mint-b', symbol: 'BBB', name: 'Token B', amount: 3, priceUsd: 1 },
];

describe('AssetsTable', () => {
  it('should render the Holding fields as column headers', () => {
    render(<AssetsTable holdings={holdings} />);
    const headers = screen
      .getAllByRole('columnheader')
      .map((th) => th.textContent);
    expect(headers).toEqual(['mint', 'symbol', 'name', 'amount', 'priceUsd']);
  });

  it('should render one row per holding', () => {
    render(<AssetsTable holdings={holdings} />);
    const [, ...rows] = screen.getAllByRole('row');
    expect(rows).toHaveLength(2);
  });

  it('should render the values of a holding in its row', () => {
    render(<AssetsTable holdings={holdings} />);
    const [, firstRow] = screen.getAllByRole('row');
    const cells = within(firstRow)
      .getAllByRole('cell')
      .map((td) => td.textContent);
    expect(cells).toEqual(['mint-a', 'AAA', 'Token A', '2', '10']);
  });
});
