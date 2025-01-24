import React, { useState } from "react";
import { Star, Search } from "lucide-react";

interface Review {
  id: number;
  propertyName: string;
  author: string;
  rating: number;
  date: string;
  review: string;
}

const reviews: Review[] = [
  {
    id: 1,
    propertyName: "Sunset Gardens Apartments",
    author: "Sarah Johnson",
    rating: 4.5,
    date: "2025-01-01",
    review: "Great community with responsive management and nearby schools.",
  },
  {
    id: 2,
    propertyName: "Pine View Heights",
    author: "Michael Chen",
    rating: 5,
    date: "2025-01-15",
    review: "Affordable rent with great amenities for families.",
  },
];

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="rating-stars">
      {[...Array(fullStars)].map((_, index) => (
        <Star key={index} className="full-star" />
      ))}
      {hasHalfStar && <Star className="half-star" />}
      {[...Array(5 - Math.ceil(rating))].map((_, index) => (
        <Star key={index} className="empty-star" />
      ))}
    </div>
  );
}

function CommunityReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = review.propertyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating ? review.rating >= filterRating : true;
    return matchesSearch && matchesRating;
  });

  return (
    <div>
      <style>
        {`
          .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .search-filter {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
          }
          .search-input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .filter-select {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .review-card {
            border: 1px solid #ddd;
            border-radius: 6px;
            padding: 15px;
            margin-bottom: 15px;
          }
          .review-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          .property-name {
            font-weight: bold;
          }
          .rating-stars {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }
          .full-star {
            color: #ffc107;
          }
          .half-star {
            color: #ffc107;
            opacity: 0.5;
          }
          .empty-star {
            color: #ddd;
          }
        `}
      </style>
      <div className="container">
        <div className="header">
          <h1>Community Reviews & Ratings</h1>
          <p>Read reviews from current and past tenants to make informed decisions.</p>
        </div>
        <div className="search-filter">
          <div className="search-container">
            <Search />
            <input
              type="text"
              className="search-input"
              placeholder="Search by property name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={filterRating || ""}
            onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
          </select>
        </div>
        <div>
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <span className="property-name">{review.propertyName}</span>
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <RatingStars rating={review.rating} />
                <p>{review.review}</p>
                <p className="author">By {review.author}</p>
              </div>
            ))
          ) : (
            <p>No reviews found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunityReviewsPage;
