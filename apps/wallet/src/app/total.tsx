import type { Holding } from './app';

type TotalProps = {
  holdings: Holding[];
};

export function Total({ holdings }: TotalProps) {
  const usersAmounts = holdings.map((h) => h.amount * h.priceUsd);
  const totalAmount = usersAmounts.reduce((acc, curr) => acc + curr, 0);

  return <div>{totalAmount}</div>;
}
