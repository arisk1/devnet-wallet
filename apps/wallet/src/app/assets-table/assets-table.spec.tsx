import { fireEvent, render, screen, within } from '@testing-library/react';

import { HOLDINGS, type Holding } from '../data-access/holding';
import { AssetsTable } from './assets-table';

const holdings: Holding[] = [
  { mint: 'mint-a', symbol: 'AAA', name: 'Token A', amount: 2, priceUsd: 10 },
  { mint: 'mint-b', symbol: 'BBB', name: 'Token B', amount: 3, priceUsd: 1 },
  { mint: 'mint-c', symbol: 'CCC', name: 'Token C', amount: 3, priceUsd: 0 },
];

describe('AssetsTable', () => {
  it('should render one row per holding', () => {
    render(<AssetsTable holdings={holdings} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);
  });

  it('should render a holding with its USD value in the last cell', () => {
    render(<AssetsTable holdings={holdings} />);
    const [firstRow] = screen.getAllByRole('row');
    const cells = within(firstRow)
      .getAllByRole('cell')
      .map((td) => td.textContent);
    expect(cells).toEqual(['AAA', 'Token A', '2', '$20.00']);
  });

  it('should hide the zero balances', () => {
    render(<AssetsTable holdings={holdings} />);
    expect(screen.getAllByRole('row')).toHaveLength(3);

    fireEvent.click(
      screen.getByRole('checkbox', { name: 'hide zero balances' }),
    );

    expect(screen.getAllByRole('row')).toHaveLength(2);
  });

  describe('sorting', () => {
    const symbolsInOrder = () =>
      screen
        .getAllByRole('row')
        .map((row) => within(row).getAllByRole('cell')[0].textContent);

    it('should order by value by default, highest first', () => {
      render(<AssetsTable holdings={HOLDINGS} />);
      expect(symbolsInOrder()).toEqual(['SOL', 'JUP', 'USDC', 'BONK']);
    });

    it('should order by symbol when "symbol" is chosen', () => {
      render(<AssetsTable holdings={HOLDINGS} />);
      const select = screen.getByRole<HTMLSelectElement>('combobox', {
        name: 'sort by',
      });

      fireEvent.change(select, { target: { value: 'symbol' } });

      expect(select.value).toBe('symbol');
      expect(symbolsInOrder()).toEqual(['BONK', 'JUP', 'SOL', 'USDC']);
    });

    it('should not mutate the holdings prop when sorting', () => {
      const input = [...HOLDINGS];
      const before = structuredClone(input);
      render(<AssetsTable holdings={input} />);

      fireEvent.change(screen.getByRole('combobox', { name: 'sort by' }), {
        target: { value: 'symbol' },
      });

      expect(input).toEqual(before);
    });
  });
});
