// ChannelModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ChannelModal = ({ show, handleClose, rowData }) => {
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
        'ADAPTERENGINENAME'
      ];

    return (
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {rowData && (
            <Container>
                {tableHeaders.map((header) => (
                <Row>
                    <Col>{header}</Col>
                    <Col>
                        <Form.Control 
                            type='text'
                            placeholder={rowData[header]}
                            aria-label={header}
                            disabled
                        />
                    </Col>
                </Row>
                ))}
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  

export default ChannelModal;