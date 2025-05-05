
import React from 'react';
import { Star } from 'lucide-react';

interface RatingsSectionProps {
  rating: number;
}

const RatingsSection = ({ rating }: RatingsSectionProps) => {
  // Convert rating to stars (max 5)
  const starRating = Math.round(rating / 2);
  
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Ratings</h2>
      <div className="flex items-center mb-4">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              fill={star <= starRating ? "gold" : "none"}
              color={star <= starRating ? "gold" : "gray"}
              size={24}
            />
          ))}
        </div>
        <span className="ml-2 text-lg text-white">{rating.toFixed(1)}/10</span>
      </div>
    </div>
  );
};

export default RatingsSection;
