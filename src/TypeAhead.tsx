import React, { ChangeEvent, useEffect, useState } from 'react';

import { Form, ListGroup, Spinner } from 'react-bootstrap';

import { useDebounce } from './useDebounce';
import { useThrottle } from './useThrottle';

interface TypeaheadProps {
  search: any;
}

/**
 * A typeahead input component that can debounce/throttle requests to the
 * passed in `search` function prop.
 *
 * @param search - The search function to be used by the generic component.
 *
 * @returns The component.
 */
const TypeAhead: React.FC<TypeaheadProps> = ({ search }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [isNameSelected, setIsNameSelected] = useState(false);

  const searchFn = async (value: string) => {
    setResults(await search(value));
    setIsLoading(false);
  };

  const debouncedSearch = useDebounce((value: string) => searchFn(value), 5000);
  // const debouncedSearch = useThrottle((value: string) => searchFn(value), 5000);

  // It is possible that a search could still be in progress, when this
  // component unmounts. In this case, an error could occur, this useEffect
  // calls the debounced/throttled function's `cancel` function.
  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);

    // even if we've selected already an item from the list,
    // we should reset it since it's been changed.
    setIsNameSelected(false);

    // clean previous results, as would be the case if we get
    // the results from a server.
    setResults([]);

    if (value.length > 1) {
      setIsLoading(true);
    }

    debouncedSearch(value);
  };

  const onNameSelected = (selectedName: string) => {
    setName(selectedName);
    setIsNameSelected(true);
    setResults([]);
  };

  return (
    <Form.Group className="typeahead-form-group">
      <Form.Control
        type="text"
        autoComplete="off"
        onChange={handleInputChange}
        value={name}
      />
      <ListGroup className="typeahead-list-group">
        {!isNameSelected &&
          results.length > 0 &&
          results.map((result: any) => (
            <ListGroup.Item
              key={result.name}
              className="typeahead-list-group-item"
              onClick={() => onNameSelected(result.name)}
            >
              {result.name}
            </ListGroup.Item>
          ))}
        {!results.length && isLoading && (
          <div className="typeahead-spinner-container">
            <Spinner animation="border" />
          </div>
        )}
      </ListGroup>
    </Form.Group>
  );
};

export default TypeAhead;
