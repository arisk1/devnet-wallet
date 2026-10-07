import { fireEvent, render, screen, within } from '@testing-library/react';

import { HOLDINGS, type Holding } from '../data-access/holding';
import { Portfolio } from './portfolio';

const holdings: Holding[] = [
  { mint: 'mint-a', symbol: 'AAA', name: 'Token A', amount: 2, priceUsd: 10 },
  { mint: 'mint-b', symbol: 'BBB', name: 'Token B', amount: 3, priceUsd: 1 },
  { mint: 'mint-c', symbol: 'CCC', name: 'Token C', amount: 3, priceUsd: 0 },
];

const symbolsInOrder = () =>
  screen
    .getAllByRole('row')
    .map((row) => within(row).getAllByRole('cell')[0].textContent);

describe('Portfolio', () => {
  it('should render the empty message and no table when there are no holdings', () => {
    render(<Portfolio holdings={[]} />);
    expect(screen.getByText('No tokens yet')).toBeTruthy();
    expect(screen.queryByRole('table')).toBeNull();
  });

  it('should render the total and one row per holding', () => {
    render(<Portfolio holdings={holdings} />);
    expect(screen.getByText('$23.00')).toBeTruthy();
    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.queryByText('No tokens yet')).toBeNull();
  });

  describe('filtering', () => {
    it('should hide the zero balances', () => {
      render(<Portfolio holdings={holdings} />);
      expect(screen.getAllByRole('row')).toHaveLength(3);

      fireEvent.click(
        screen.getByRole('checkbox', { name: 'hide zero balances' }),
      );

      expect(screen.getAllByRole('row')).toHaveLength(2);
      expect(symbolsInOrder()).not.toContain('CCC');
    });

    it('should keep the total unchanged when zero balances are hidden', () => {
      render(<Portfolio holdings={holdings} />);

      fireEvent.click(
        screen.getByRole('checkbox', { name: 'hide zero balances' }),
      );

      expect(screen.getByText('$23.00')).toBeTruthy();
    });
  });

  describe('sorting', () => {
    it('should order by value by default, highest first', () => {
      render(<Portfolio holdings={HOLDINGS} />);
      expect(symbolsInOrder()).toEqual(['SOL', 'JUP', 'USDC', 'BONK']);
    });

    it('should order by symbol when "symbol" is chosen', () => {
      render(<Portfolio holdings={HOLDINGS} />);
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
      render(<Portfolio holdings={input} />);

      fireEvent.change(screen.getByRole('combobox', { name: 'sort by' }), {
        target: { value: 'symbol' },
      });

      expect(input).toEqual(before);
    });
  });
});
