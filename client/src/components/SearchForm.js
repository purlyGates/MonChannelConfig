// SearchForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { useDataContext } from '../DataContext';

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { setContextData } = useDataContext();

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

      const data = await response.json();

      const dataToSend = { searchResults: data,
                           term: searchTerm };
      setContextData(dataToSend);
      navigate('/search');
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSearchSubmit}>
        <Form.Group className="mb-3" controlId="formSearch">
            <Form.Label>Enter your search:</Form.Label>
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type here..."
            />
        </Form.Group>
          <Button variant="primary" type="submit">
            Search
          </Button>
      </Form>
    </Container>
  );
}

export default SearchForm;
