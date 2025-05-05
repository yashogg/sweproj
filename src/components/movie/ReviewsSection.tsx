
import { useState } from 'react';
import { ReviewItem } from '@/services/types';
import { Button } from '@/components/ui/button';

interface ReviewsSectionProps {
  initialReviews: ReviewItem[];
  movieId: string;
}

const ReviewsSection = ({ initialReviews, movieId }: ReviewsSectionProps) => {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [showAddReview, setShowAddReview] = useState(false);
  
  const handleAddReview = (rating: number, comment: string) => {
    const newReview: ReviewItem = {
      id: `review_${Date.now()}`,
      user: 'You', // Assume the current user
      rating,
      comment,
      date: new Date().toISOString()
    };
    
    setReviews([newReview, ...reviews]);
    setShowAddReview(false);
  };
  
  return (
    <div className="bg-ticketeer-purple-dark p-6 rounded-md mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Reviews</h2>
        
        {!showAddReview && (
          <Button 
            onClick={() => setShowAddReview(true)}
            variant="outline"
          >
            Write a Review
          </Button>
        )}
      </div>
      
      {showAddReview && (
        <div className="mb-6 p-4 bg-ticketeer-purple rounded-md">
          <h3 className="font-bold text-white mb-4">Your Review</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Rating (1-10)</label>
              <select className="bg-ticketeer-purple-darker p-2 rounded w-32 text-white">
                {[...Array(10)].map((_, i) => (
                  <option key={i+1} value={i+1}>
                    {i+1} {i === 0 ? 'star' : 'stars'}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Your Comments</label>
              <textarea 
                className="w-full bg-ticketeer-purple-darker p-3 rounded text-white"
                rows={4}
                placeholder="Share your thoughts about this movie..."
              ></textarea>
            </div>
            
            <div className="flex gap-2">
              <Button className="bg-ticketeer-yellow text-black hover:bg-yellow-400">
                Submit Review
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowAddReview(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="border-b border-ticketeer-purple pb-4 mb-4 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-medium text-white">{review.user}</span>
                  <span className="ml-4 text-sm text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold
                  ${review.rating >= 8 ? 'bg-green-900 text-green-300' :
                    review.rating >= 6 ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'}`
                }>
                  {review.rating}/10
                </span>
              </div>
              <p className="text-gray-300">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center italic">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
