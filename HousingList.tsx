import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Bed, Bath, Home } from 'lucide-react';

const housings = [
  {
    id: 1,
    title: 'Modern Downtown Apartment',
    location: 'Downtown, San Francisco',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400',
    rating: 4.5,
    beds: 2,
    baths: 1,
    sqft: 850,
    type: 'apartment',
  },
  {
    id: 2,
    title: 'Cozy Studio Near Transit',
    location: 'Mission District, San Francisco',
    price: 950,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400',
    rating: 4.2,
    beds: 1,
    baths: 1,
    sqft: 500,
    type: 'studio',
  },
  {
    id: 3,
    title: 'Family-Friendly Townhouse',
    location: 'Richmond District, San Francisco',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400',
    rating: 4.8,
    beds: 3,
    baths: 2,
    sqft: 1200,
    type: 'house',
  },
  {
    id: 4,
    title: 'Shared Housing in Downtown',
    location: 'Downtown, San Francisco',
    price: 800,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400',
    rating: 4.0,
    beds: 1,
    baths: 1,
    sqft: 400,
    type: 'shared',
  },
];

export default function HousingList({ sortBy = 'price-low', searchCriteria = {} }) {
  const { location = '', priceRange = '', propertyType = '' } = searchCriteria;

  // Filter housing data based on search criteria
  const filteredHousing = housings.filter((housing) => {
    const matchesLocation = location
      ? housing.location.toLowerCase().includes(location.toLowerCase())
      : true;
    const matchesPriceRange = priceRange
      ? (priceRange === '0-500' && housing.price <= 500) ||
        (priceRange === '501-1000' && housing.price > 500 && housing.price <= 1000) ||
        (priceRange === '1001-1500' && housing.price > 1000 && housing.price <= 1500) ||
        (priceRange === '1501+' && housing.price > 1500)
      : true;
    const matchesPropertyType = propertyType
      ? housing.type === propertyType
      : true;

    return matchesLocation && matchesPriceRange && matchesPropertyType;
  });

  // Sort housing data based on the selected sorting option
  const sortedHousing = filteredHousing.sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="housing-list">
      <div className="housing-grid">
        {sortedHousing.map((housing) => (
          <div key={housing.id} className="housing-card">
            <img src={housing.image} alt={housing.title} className="housing-image" />
            <div className="housing-info">
              <div className="housing-header">
                <h3 className="housing-title">{housing.title}</h3>
                <div className="housing-rating">
                  <Star className="icon-star" />
                  <span>{housing.rating}</span>
                </div>
              </div>
              <div className="housing-location">
                <MapPin className="icon" />
                <span>{housing.location}</span>
              </div>
              <div className="housing-details">
                <div>
                  <Bed className="icon" />
                  <span>{housing.beds} Beds</span>
                </div>
                <div>
                  <Bath className="icon" />
                  <span>{housing.baths} Bath</span>
                </div>
                <div>
                  <Home className="icon" />
                  <span>{housing.sqft} sqft</span>
                </div>
              </div>
              <div className="housing-footer">
                <span className="housing-price">${housing.price}</span>
                <Link to={`/housing/${housing.id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          body {
            background-color: #E0E1DD;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }

          .housing-list {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .housing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
          }

          .housing-card {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: box-shadow 0.3s ease;
          }

          .housing-card:hover {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          }

          .housing-image {
            width: 100%;
            height: 180px;
            object-fit: cover;
          }

          .housing-info {
            padding: 16px;
          }

          .housing-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
          }

          .housing-title {
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
          }

          .housing-rating {
            display: flex;
            align-items: center;
            color: #ffa500;
          }

          .icon-star {
            width: 16px;
            height: 16px;
            margin-right: 4px;
          }

          .housing-location,
          .housing-details {
            display: flex;
            align-items: center;
            margin-top: 8px;
            color: #666;
          }

          .housing-details div {
            margin-right: 12px;
            display: flex;
            align-items: center;
          }

          .icon {
            width: 16px;
            height: 16px;
            margin-right: 4px;
          }

          .housing-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 16px;
          }

          .housing-price {
            font-size: 1.5rem;
            font-weight: bold;
            color: #1B263B;
          }

          .view-details-btn {
            background: #1B263B;
            color: white;
            padding: 8px 16px;
            border-radius: 5px;
            text-decoration: none;
            transition: background 0.3s ease;
          }

          .view-details-btn:hover {
            background: #344F66;
          }
        `}
      </style>
    </div>
  );
}
