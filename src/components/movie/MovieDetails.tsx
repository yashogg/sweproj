
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ReviewItem } from '../../services/types';

// Status Badge Component
const StatusBadge = ({ status }: { status: 'Now Playing' | 'Upcoming' | 'Finished' }) => {
  let colorClasses = '';
  
  switch (status) {
    case 'Now Playing':
      colorClasses = 'bg-green-100 text-green-800';
      break;
    case 'Upcoming':
      colorClasses = 'bg-blue-100 text-blue-800';
      break;
    case 'Finished':
      colorClasses = 'bg-gray-100 text-gray-800';
      break;
  }
  
  return (
    <div className="mb-6">
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses}`}>
        {status}
      </span>
    </div>
  );
};

// Rating Circle Component
const RatingCircle = ({ rating }: { rating: number }) => {
  const percentage = (rating / 10) * 100;
  const circumference = 2 * Math.PI * 35;
  const offset = circumference - (percentage / 100) * circumference;
  
  const getColor = () => {
    if (rating >= 7) return '#22c55e'; // green
    if (rating >= 5) return '#eab308'; // yellow
    return '#ef4444'; // red
  };
  
  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke={getColor()}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <span className="absolute text-xl font-bold">
        {rating}
      </span>
    </div>
  );
};

// Review Form Component
interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
  onCancel: () => void;
}

const ReviewForm = ({ onSubmit, onCancel }: ReviewFormProps) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, comment);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-md mb-6">
      <h3 className="text-white font-medium mb-3">Write a Review</h3>
      
      <div className="mb-4">
        <label className="block text-gray-300 text-sm mb-1">Rating</label>
        <div className="flex items-center">
          <input
            type="range"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="w-full"
          />
          <span className="ml-2 text-white">{rating}/10</span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-300 text-sm mb-1">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          rows={3}
          required
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="bg-transparent text-white hover:bg-gray-700"
        >
          Cancel
        </Button>
        <Button type="submit">Submit Review</Button>
      </div>
    </form>
  );
};

// Review Item Component
interface ReviewItemProps {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewItem = ({ user, rating, comment, date }: ReviewItemProps) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <div className="p-4 bg-gray-800 rounded-md">
      <div className="flex justify-between mb-2">
        <div className="font-medium text-white">{user}</div>
        <div className="text-sm text-gray-400">{formattedDate}</div>
      </div>
      <div className="flex items-center mb-2">
        <span className="text-yellow-400 mr-1">★</span>
        <span className="text-white">{rating}/10</span>
      </div>
      <p className="text-gray-300">{comment}</p>
    </div>
  );
};

// Cast Section Component
interface CastMember {
  name: string;
  character: string;
  photo: string;
}

const CastSection = ({ cast }: { cast: CastMember[] }) => {
  if (cast.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-white mb-4">Cast</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {cast.map((member, index) => (
          <div key={index} className="flex-none w-32">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src={member.photo} 
                alt={member.name} 
                className="w-full h-40 object-cover"
              />
              <div className="p-2">
                <p className="text-white font-medium text-sm truncate">{member.name}</p>
                <p className="text-gray-400 text-xs truncate">{member.character}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main MovieDetails Component
interface MovieDetailsProps {
  description: string;
  cast: CastMember[];
  rating: number;
  status: 'Now Playing' | 'Upcoming' | 'Finished';
  reviews: ReviewItem[];
  movieId: string;
}

const MovieDetails = ({ description, cast, rating, status, reviews: initialReviews, movieId }: MovieDetailsProps) => {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmitReview = (rating: number, comment: string) => {
    // In a real app, this would be an API call to save the review
    const newReview: ReviewItem = {
      id: `review_${Date.now()}`,
      user: "CurrentUser", // In a real app, get this from auth context
      rating,
      comment,
      date: new Date().toISOString()
    };

    setReviews([...reviews, newReview]);
    setShowReviewForm(false);
  };

  return (
    <div className="text-gray-200">
      {/* Status Badge */}
      <StatusBadge status={status} />
      
      {/* Movie Synopsis */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Synopsis</h2>
        <p className="text-gray-300 leading-relaxed">{description || 'No description available.'}</p>
      </div>
      
      {/* Cast Section */}
      <CastSection cast={cast} />
      
      {/* Ratings Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Ratings</h2>
        <div className="flex items-center">
          <RatingCircle rating={rating} />
          <div className="ml-4">
            <div className="text-lg font-medium text-white">{rating}/10</div>
            <div className="text-sm text-gray-400">User Rating</div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Reviews</h2>
          {!showReviewForm && (
            <Button 
              onClick={() => setShowReviewForm(true)}
              variant="outline"
              className="text-white border-yellow-500 hover:bg-yellow-500 hover:text-black"
            >
              Write a Review
            </Button>
          )}
        </div>
        
        {showReviewForm && (
          <ReviewForm 
            onSubmit={handleSubmitReview}
            onCancel={() => setShowReviewForm(false)}
          />
        )}
        
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No reviews yet. Be the first to leave a review!</p>
          ) : (
            reviews.map((review, index) => (
              <ReviewItem
                key={index}
                id={parseInt(review.id) || index}
                user={review.user}
                rating={review.rating}
                comment={review.comment}
                date={review.date}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
