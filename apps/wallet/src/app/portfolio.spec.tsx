import { render, screen } from '@testing-library/react';

import type { Holding } from './holding';
import { Portfolio } from './portfolio';

const holdings: Holding[] = [
  { mint: 'mint-a', symbol: 'AAA', name: 'Token A', amount: 2, priceUsd: 10 },
  { mint: 'mint-b', symbol: 'BBB', name: 'Token B', amount: 3, priceUsd: 1 },
];

describe('Portfolio', () => {
  it('should render the empty message and no table when there are no holdings', () => {
    render(<Portfolio holdings={[]} />);
    expect(screen.getByText('No tokens yet')).toBeTruthy();
    expect(screen.queryByRole('table')).toBeNull();
  });

  it('should render the total and one row per holding', () => {
    render(<Portfolio holdings={holdings} />);
    expect(screen.getByText('$23.00')).toBeTruthy();
    expect(screen.getAllByRole('row')).toHaveLength(2);
    expect(screen.queryByText('No tokens yet')).toBeNull();
  });
});
