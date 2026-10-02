import { AssetsTable } from './assets-table';
import { HOLDINGS } from './holding';

export function App() {

  return (
    <main>
      <h1>Devnet Wallet</h1>
      {HOLDINGS.length <= 0 ? (
        'No tokens yet'
      ) : (
        <AssetsTable holdings={HOLDINGS} />
      )}
    </main>
  );
}



export default App;
