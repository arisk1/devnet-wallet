import { render, screen } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render in the h1', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('Devnet Wallet');
  });
});
