// src/pages/SearchResultsPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './SearchResultsPage.module.css';

function SearchResultsPage() {
  // Replace this with your actual search results rendering logic
  const searchResults = ['Result 1', 'Result 2', 'Result 3'];

  return (
    <div className={styles.searchResultsPage}>
      <h1>Search Results</h1>

      {/* Render your search results */}
      {searchResults.map((result, index) => (
        <div key={index} className={styles.resultItem}>
          {result}
        </div>
      ))}
    </div>
  );
}

export default SearchResultsPage;
