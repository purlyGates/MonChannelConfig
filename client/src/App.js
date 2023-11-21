// App.js
import React, { useState } from 'react';
import './App.css';
import ResultsPage from './ResultsPage';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [showResultsPage, setShowResultsPage] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a request to the backend to search for the term
      const response = await fetch('http://localhost:3001/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ term: searchTerm }),
      });

      // TEST
      console.log(response);


      if (!response.ok) {
        throw new Error('Search request failed');
      }

      // Parse the response JSON
      const data = await response.json();

      // Update the state with the search results
      setSearchResults(data);
      setShowResultsPage(true); // Set flag to show results page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Communication Channel Config Search</h1>
        <form onSubmit={handleSearchSubmit}>
          <label>
            Enter your search:
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Type here..."
            />
          </label>
          <button type="submit">Search</button>
        </form>

        {/* Display search results if available */}
        {showResultsPage && <ResultsPage searchResults={searchResults} />}
      </header>
    </div>
  );
}

export default App;