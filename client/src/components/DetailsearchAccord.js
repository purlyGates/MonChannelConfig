import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useDataContext } from '../DataContext';

const tableHeaders = [
  'CC_ID',
  'MASTERLANGUAGE',
  'RESPONSIBLEUSERACCOUNTID',
  'LASTCHANGEUSERACCOUNTID',
  'LASTCHANGEDATETIME',
  'FOLDERPATHID',
  'CC_DESCRIPTION',
  'PARTYID',
  'COMPONENTID',
  'CHANNELID',
  'ADA_META_NAME',
  'ADA_META_NAMESPACE',
  'ADA_META_SCVERSIONID',
  'DIRECTION',
  'TRANSPORTPROTOCOL',
  'TRANSPORTPROTOCOLVERSION',
  'MESSAGEPROTOCOL',
  'MESSAGEPROTOCOLVERSION',
  'ADAPTERENGINENAME',
];

const DetailsearchAccord = () => {
  const initialFormValues = Object.fromEntries(tableHeaders.map((header) => [header, '']));
  const [formValues, setFormValues] = useState(initialFormValues);
  const { setContextData } = useDataContext();

  const navigate = useNavigate();

  const handleChange = (header, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [header]: value,
    }));
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to the server with the search term
      const response = await fetch('http://localhost:3001/filteredSearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filters: formValues }),
      });

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = await response.json();
      const dataToSend = { searchResults: data,
                            filters: formValues };
      setContextData(dataToSend);
      // Redirect to the SearchResultsPage with the search term
      navigate(`/search`);
    } catch (error) {
      console.error(error);
    }
  };

  return ( <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Detailed Filters</Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleSearchSubmit}>
            <Container>
              <Form.Group>
                {tableHeaders.map((header) => (
                  <Row key={header}>
                    <Col>
                    <Form.Label>{header}:</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        type="text" 
                        value={formValues[header] || ''}
                        onChange={(e) => handleChange(header, e.target.value)}
                      />
                    </Col>
                    <Col></Col>
                  </Row>
                ))}
              </Form.Group>
            </Container>
            <Button variant='primary' type='submit'>Submit</Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
export default DetailsearchAccord;