// SearchResultsPage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { useDataContext } from '../DataContext';
import ChannelModal from '../components/ChannelModal';

function SearchResultsPage() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  
  const {data: { searchResults } } = useDataContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  const totalObjects = searchResults.length;
  const itemsPerPage = 11; // You can adjust this based on your needs
  const totalPages = Math.ceil(totalObjects / itemsPerPage);

  // selection for Modal
  const [selectedRow, setSelectedRow] = useState(null);

  // Modal handling
  const handleClose = () => setShow(false);
  const handleShow = (rowData) => {
    setSelectedRow(rowData);
    setShow(true);
  };

  useEffect(() => {
    // Fetch or use data based on the current page
    // You can make a new API call or simply filter the existing data
    const lastPageSize = totalObjects % itemsPerPage || itemsPerPage;
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = currentPage === totalPages ? startIdx + lastPageSize : startIdx + itemsPerPage;
    const currentPageData = searchResults.slice(startIdx, endIdx); // replace 'data' with your array

    // Use currentPageData as needed
    console.log('Current Page Data:', currentPageData);

    // Update the state with the paginated data
    setPaginatedData(currentPageData);
  }, [currentPage, searchResults, itemsPerPage, totalObjects, totalPages, location.search]);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
          {paginatedData.map((searchRow) => (
             <tr key={searchRow["CC_ID"]} onClick={() => handleShow(searchRow)}>
              {tableHeaders.map((header) => (
                <td key={header}>{searchRow[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Render pagination controls */}
      <div className='pagination-controls'>
        <Button
          variant="primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </Button>
        <span> Page {currentPage} of {totalPages} </span>
        <Button
          variant="primary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next Page
        </Button>
      </div>

      <ChannelModal show={show} handleClose={handleClose} rowData={selectedRow} animation={false} />

    </Container>
  );
}

export default SearchResultsPage;
