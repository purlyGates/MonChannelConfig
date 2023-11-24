// src/pages/HomePage.js
import React from 'react';
import SearchForm from '../components/SearchForm';
import { Container } from 'react-bootstrap';
import DetailsearchAccord from '../components/DetailsearchAccord';

function HomePage() { return (
    <Container key="0">
      <h1>Communication Channel Config Search</h1>
      <SearchForm />
      <DetailsearchAccord />
    </Container>
  );
}

export default HomePage;
