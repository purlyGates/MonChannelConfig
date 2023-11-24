// SearchResultsPage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import ChannelModal from '../components/ChannelModal';

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Modal handling
  const handleClose = () => setShow(false);
  const handleShow = (rowData) => {
    setSelectedRow(rowData);
    setShow(true);
  };

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
    'CC_ID',
    'RESPONSIBLEUSERACCOUNTID',
    'LASTCHANGEDATETIME',
    'PARTYID',
    'COMPONENTID',
    'CHANNELID',
    'ADA_META_NAME',
    'DIRECTION',
  ];

  return (
    <Container>
      <h1>Search Results</h1>

      {/* Render your search results in a table */}
      <Table hover>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {searchResults.map((searchRow) => (
             <tr key={searchRow["CC_ID"]} onClick={() => handleShow(searchRow)}>
              {tableHeaders.map((header) => (
                <td key={header}>{searchRow[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <ChannelModal show={show} handleClose={handleClose} rowData={selectedRow} animation={false} />

    </Container>
  );
}

export default SearchResultsPage;
