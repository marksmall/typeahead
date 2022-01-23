import TypeAhead from './TypeAhead';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const search = async (criteria: string) => {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${criteria}`,
  );

  const body = await response.json();

  return body.results;
};

const App = () => {
  return (
    <div className="App">
      <TypeAhead search={search} />
    </div>
  );
};

export default App;
