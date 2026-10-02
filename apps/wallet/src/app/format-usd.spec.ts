import { formatUsd } from './format-usd';

describe('formatUsd', () => {
  it('should format a number as US dollars', () => {
    expect(formatUsd(1234.5)).toBe('$1,234.50');
  });
});
