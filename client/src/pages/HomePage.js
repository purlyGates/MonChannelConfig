// src/pages/HomePage.js
import React from 'react';
import SearchForm from '../components/SearchForm';
import { Container } from 'react-bootstrap';

function HomePage() { return (
    <Container>
      <h1>Communication Channel Config Search</h1>
      <SearchForm />
    </Container>
  );
}

export default HomePage;
