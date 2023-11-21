// SearchForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to the server with the search term
      const response = await fetch('http://localhost:3001/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ term: searchTerm }),
      });

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      // Redirect to the SearchResultsPage with the search term
      navigate(`/search?term=${searchTerm}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <label>
        Enter your search:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type here..."
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
