import React, { useState } from 'react';
import { ListFilter } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import HousingList from '../components/HousingList';

export default function SearchResultsPage() {
  const [sortBy, setSortBy] = useState('price-low');
  const [searchCriteria, setSearchCriteria] = useState({
    location: '',
    priceRange: '',
    propertyType: '',
  });

  // Handle search criteria from the SearchBar component
  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Pass the handleSearch function to the SearchBar */}
      <SearchBar onSearch={handleSearch} />
      
      <div className="mt-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
        <div className="flex items-center space-x-4">
          <ListFilter className="w-5 h-5 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {/* Pass sortBy and searchCriteria to the HousingList component */}
      <HousingList sortBy={sortBy} searchCriteria={searchCriteria} />
    </div>
  );
}