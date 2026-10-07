import type { Holding } from '../data-access/holding';
import { formatUsd } from '../shared/utils/format-usd';

type TotalProps = {
  holdings: Holding[];
};

export function Total({ holdings }: TotalProps) {
  const usersAmounts = holdings.map((h) => h.amount * h.priceUsd);
  const totalAmount = usersAmounts.reduce((acc, curr) => acc + curr, 0);

  return <div>{formatUsd(totalAmount)}</div>;
}
