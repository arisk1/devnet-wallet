import { HOLDINGS } from './holding';
import { Portfolio } from './portfolio';

export function App() {
  return (
    <main>
      <h1>Devnet Wallet</h1>
      <Portfolio holdings={HOLDINGS} />
    </main>
  );
}

export default App;
