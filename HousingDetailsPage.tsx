import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Bed, Bath, Home, DollarSign, Calendar } from 'lucide-react';
import BookingCalendar from '../components/BookingCalender'; // Import the new component

export default function HousingDetailsPage() {
  const { id } = useParams();
  const [isTourModalOpen, setIsTourModalOpen] = useState(false); // Controls if the calendar modal is open
  const [selectedDate, setSelectedDate] = useState(null);

  const handleScheduleTour = () => {
    setIsTourModalOpen(true); // Open the calendar modal when user clicks "Schedule a Tour"
  };

  const handleCloseModal = () => {
    setIsTourModalOpen(false); // Close the calendar modal
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    alert(`Your tour has been successfully scheduled for ${date}!`);
    setIsTourModalOpen(false); // Close the modal after selecting a date
  };

  // Mock data for demonstration
  const housing = {
    id: 1,
    title: 'Modern Downtown Apartment',
    location: 'Downtown, San Francisco',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    price: 1200,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000',
    rating: 4.5,
    beds: 2,
    baths: 1,
    sqft: 850,
    description: 'Beautiful modern apartment in the heart of downtown. Features updated appliances, in-unit laundry, and a private balcony with city views.',
    amenities: ['In-unit Laundry', 'Dishwasher', 'Central Heat/AC', 'Balcony', 'Pet Friendly'],
    nearbyAmenities: [
      { name: 'City Park', coordinates: { lat: 37.776, lng: -122.418 } },
      { name: 'Grocery Store', coordinates: { lat: 37.775, lng: -122.420 } },
      { name: 'School', coordinates: { lat: 37.773, lng: -122.417 } },
    ],
    reviews: [
      { id: 1, user: 'John D.', rating: 5, comment: 'Excellent location and amenities!' },
      { id: 2, user: 'Sarah M.', rating: 4, comment: 'Great value for the area.' },
    ],
    unavailableDates: ['2025-01-25', '2025-01-28', '2025-01-30'], // Mock unavailable dates
  };

  return (
    <div className="bg-[#E0E1DD] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img src={housing.image} alt={housing.title} className="w-full h-96 object-cover rounded-lg shadow-md" />
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900">{housing.title}</h2>
              <div className="mt-2 flex items-center space-x-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-1" />
                  <span>{housing.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  <span>{housing.rating}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="mt-2 text-gray-600">{housing.description}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">Amenities</h3>
              <ul className="mt-2 grid grid-cols-2 gap-4">
                {housing.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center text-gray-600">
                    <Home className="w-4 h-4 mr-2 text-indigo-600" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-[#1B263B]">${housing.price}</span>
                <span className="text-gray-500">/month</span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Bed className="w-6 h-6 mx-auto text-gray-400" />
                  <span className="block mt-1 text-sm">{housing.beds} Beds</span>
                </div>
                <div className="text-center">
                  <Bath className="w-6 h-6 mx-auto text-gray-400" />
                  <span className="block mt-1 text-sm">{housing.baths} Bath</span>
                </div>
                <div className="text-center">
                  <Home className="w-6 h-6 mx-auto text-gray-400" />
                  <span className="block mt-1 text-sm">{housing.sqft} sqft</span>
                </div>
              </div>

              <button
                className="mt-6 w-full bg-[#1B263B] text-white px-6 py-3 rounded-md hover:bg-[#1B263B] flex items-center justify-center"
                onClick={handleScheduleTour} // Show calendar modal when clicked
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Tour
              </button>

              {isTourModalOpen && (
                <BookingCalendar
                  unavailableDates={housing.unavailableDates}
                  onDateSelect={handleDateSelect}
                  onClose={handleCloseModal} // Close the calendar modal
                />
              )}

              <Link
                to="/apply/:id"
                className="mt-4 w-full bg-white text-[#1B263B] px-6 py-3 rounded-md border-2 border-[#1B263B] hover:bg-[#f1f5f8] block text-center"
              >
                Apply Now
              </Link>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold">Property Location</h3>
              <MapContainer
                center={[housing.coordinates.lat, housing.coordinates.lng]}
                zoom={14}
                className="h-72 w-full rounded-lg mt-4"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[housing.coordinates.lat, housing.coordinates.lng]}>
                  <Popup>{housing.location}</Popup>
                </Marker>
                {housing.nearbyAmenities.map((amenity, index) => (
                  <Marker key={index} position={[amenity.coordinates.lat, amenity.coordinates.lng]}>
                    <Popup>{amenity.name}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold">Reviews</h3>
              <div className="mt-4 space-y-4">
                {housing.reviews.map((review) => (
                  <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between">
                      <span className="font-medium">{review.user}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1">{review.rating}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
