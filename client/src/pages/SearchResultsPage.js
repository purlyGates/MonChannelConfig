// SearchResultsPage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './SearchResultsPage.module.css';

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const term = new URLSearchParams(location.search).get('term');

    const fetchSearchResults = async () => {
      try {
        const response = await fetch('http://localhost:3001/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ term }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSearchResults();
  }, [location.search]);

  const tableHeaders = [
    'CCID',
    'MasterLanguage',
    'ResponsibleUserAccountID',
    'LastChangeUserAccountID',
    'LastChangedDatetime',
    'FolderPathID',
    'CCDescription',
    'PartyID',
    'ComponentID',
    'ChannelID',
    'AdaMetaName',
    'AdaMetaNamespace',
    'AdaMetaScVersionID',
    'Direction',
    'TransportProtocol',
    'TransportProtocolVersion',
    'MessageProtocol',
    'MessageProtocolVersion',
    'AdapterEngineName',
  ];

  return (
    <div className={styles.searchResultsPage}>
      <h1>Search Results</h1>

      {/* Render your search results in a table */}
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {searchResults.map((result, index) => (
            <tr key={index}>
              {result.map((field, fieldIndex) => (
                <td key={fieldIndex}>{field}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchResultsPage;
