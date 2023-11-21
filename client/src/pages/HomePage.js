// src/pages/HomePage.js
import React from 'react';
import SearchForm from '../components/SearchForm';
import styles from './HomePage.module.css'

function HomePage() {
  return (
    <div className={styles.homePage}>
      <h1 className={styles.homePageTitle}>Communication Channel Config Search</h1>
      <div className={styles.searchFormContainer}>
        <SearchForm />
      </div>
    </div>
  );
}

export default HomePage;
