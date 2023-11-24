import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

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
  const [formValues, setFormValues] = useState({});

  const handleChange = (header, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [header]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can access the form values in the state (formValues) and perform actions like API calls or other logic.
    console.log('Form Values:', formValues);
  };

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Detailed Filters</Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleSubmit}>
            <Container>
              <Form.Group>
                {tableHeaders.map((header) => (
                  <Row>
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
            <Button>Submit</Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
export default DetailsearchAccord;