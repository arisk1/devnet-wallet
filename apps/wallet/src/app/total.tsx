import type { Holding } from './app';
import { formatUsd } from './format-usd';

type TotalProps = {
  holdings: Holding[];
};

export function Total({ holdings }: TotalProps) {
  const usersAmounts = holdings.map((h) => h.amount * h.priceUsd);
  const totalAmount = usersAmounts.reduce((acc, curr) => acc + curr, 0);

  return <div>{formatUsd(totalAmount)}</div>;
}
