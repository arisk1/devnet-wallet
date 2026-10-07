import { render } from '@testing-library/react';

import type { Holding } from '../data-access/holding';
import { Total } from './total';

const holdings: Holding[] = [
  { mint: 'mint-a', symbol: 'AAA', name: 'Token A', amount: 2, priceUsd: 10 },
  { mint: 'mint-b', symbol: 'BBB', name: 'Token B', amount: 3, priceUsd: 1 },
];

describe('Total', () => {
  it('should render the summed USD value of the holdings', () => {
    const { container } = render(<Total holdings={holdings} />);
    expect(container.textContent).toBe('$23.00');
  });
});
