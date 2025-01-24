import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapWithProperties() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [budget, setBudget] = useState('');
  const [properties, setProperties] = useState([]);

  const MapClickHandler = () => {
    useMapEvents({
      click: (event) => {
        setSelectedArea({ lat: event.latlng.lat, lng: event.latlng.lng });
      },
    });
    return null;
  };

  const fetchProperties = async () => {
    // Mock data fetching based on selectedArea and budget
    if (!selectedArea || !budget) {
      alert('Please select an area on the map and enter a budget.');
      return;
    }

    // Replace this mock data with API integration
    const mockProperties = [
      { id: 1, name: 'Apartment A', price: 8000, lat: selectedArea.lat + 0.01, lng: selectedArea.lng + 0.01 },
      { id: 2, name: 'Apartment B', price: 10000, lat: selectedArea.lat - 0.01, lng: selectedArea.lng - 0.01 },
    ].filter((property) => property.price <= budget);

    setProperties(mockProperties);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white min-h-screen">
      <div className="w-full max-w-3xl bg-neutral-200 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Properties</h2>
        <div className="mb-4">
          <label htmlFor="budget" className="block text-gray-600 text-sm font-medium mb-1">Enter Budget:</label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter your budget"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          className="w-full bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-600"
          onClick={fetchProperties}
        >
          Search Properties
        </button>
      </div>
      <div className="w-full max-w-5xl">
        <MapContainer
          center={[19.076, 72.877]} // Default center: Mumbai
          zoom={12}
          className="h-96 w-full rounded-lg shadow-md"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={[property.lat, property.lng]}
            ></Marker>
          ))}
        </MapContainer>
      </div>
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Properties in Selected Area:</h3>
        {properties.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {properties.map((property) => (
              <li key={property.id} className="py-2 flex justify-between">
                <span className="text-gray-700">{property.name}</span>
                <span className="text-gray-900 font-semibold">${property.price}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No properties found within the selected budget.</p>
        )}
      </div>
    </div>
  );
}
