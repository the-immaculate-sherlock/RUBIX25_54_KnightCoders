import React from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import HousingList from '../components/HousingList';
import Maps from '../components/Maps';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <SearchBar />
      <Maps />
      <HousingList />
    </div>
  );
}