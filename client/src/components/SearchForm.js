// src/components/SearchForm.js
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Assuming you want to search when the form is submitted
    // You can modify this logic based on your requirements
    console.log('Input value:', inputRef.current.value);
    navigate(`/search?term=${searchTerm}`);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <label>
        Enter your search:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          ref={inputRef}
          placeholder="Type here..."
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
