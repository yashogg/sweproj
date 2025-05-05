
import { useState } from 'react';

interface RatingsSectionProps {
  userRating: number;
}

const RatingsSection = ({ userRating }: RatingsSectionProps) => {
  const [rating, setRating] = useState<number>(userRating);
  
  // Helper functions for rating display
  const getColor = () => {
    if (rating >= 8) return 'text-green-500';
    if (rating >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Ratings</h2>
      <div className="flex items-center space-x-4">
        <div className={`text-5xl font-bold ${getColor()}`}>
          {rating.toFixed(1)}
        </div>
        <div className="text-gray-400">
          <p className="text-sm">Overall Rating</p>
          <div className="flex mt-1">
            {[...Array(10)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? getColor() : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingsSection;
