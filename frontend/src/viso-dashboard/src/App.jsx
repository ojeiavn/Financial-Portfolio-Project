import './App.css';
import { Dashboard } from './Dashboard';
import LiveClock from './LiveClock';

function App() {
  return (
    <>
      <header>
        <h1>Financial Portfolio</h1>
        <LiveClock />
      </header>
      <Dashboard />
    </>
  );
}

export default App;
