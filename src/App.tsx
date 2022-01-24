import React from 'react';

import TypeAhead from './TypeAhead';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/**
 * A function to make API calls to the Star Wars API
 * and return results.
 * @param criteria
 * @returns
 */
const search = async (criteria: string): Promise<object[]> => {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${criteria}`,
  );

  const body = await response.json();

  return body.results;
};

const App: React.FC = () => {
  return (
    <div className="App">
      <TypeAhead search={search} />
    </div>
  );
};

export default App;
