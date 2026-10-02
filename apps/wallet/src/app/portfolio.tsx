import { AssetsTable } from './assets-table';
import type { Holding } from './holding';
import { Total } from './total';

type PortfolioProps = {
  holdings: Holding[];
};

export function Portfolio({ holdings }: PortfolioProps) {
  if (holdings.length === 0) {
    return <div>No tokens yet</div>;
  }

  return (
    <div>
      <Total holdings={holdings} />
      <AssetsTable holdings={holdings} />
    </div>
  );
}
