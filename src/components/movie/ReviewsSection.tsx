
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { ReviewItem } from '@/services/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  movieId: string;
  onAddReview?: (rating: number, comment: string) => void;
}

const ReviewsSection = ({ reviews, movieId, onAddReview }: ReviewsSectionProps) => {
  const { isAuthenticated } = useAuth();
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
  };
  
  const handleRatingHover = (rating: number) => {
    setHoverRating(rating);
  };
  
  const handleSubmit = async () => {
    if (!userRating || !userComment.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (onAddReview) {
        onAddReview(userRating, userComment);
      }
      
      // Reset form
      setUserRating(0);
      setUserComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Reviews</h2>
      
      {/* Review form for authenticated users */}
      {isAuthenticated && (
        <div className="mb-8 bg-ticketeer-purple-dark p-6 rounded-md">
          <h3 className="text-lg font-medium mb-4 text-white">Leave a Review</h3>
          <div className="mb-4">
            <p className="text-sm mb-2 text-gray-300">Your Rating</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="cursor-pointer mr-1"
                  fill={(star <= (hoverRating || userRating)) ? "gold" : "none"}
                  color={(star <= (hoverRating || userRating)) ? "gold" : "gray"}
                  size={24}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => handleRatingHover(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm mb-2 text-gray-300">Your Comment</p>
            <Textarea
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              placeholder="Share your thoughts about this movie..."
              className="bg-ticketeer-purple-darker text-white border-ticketeer-purple"
              rows={4}
            />
          </div>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || !userRating || !userComment.trim()}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      )}
      
      {/* List of reviews */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-ticketeer-purple-dark p-4 rounded-md">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-white">{review.user}</p>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        fill={star <= Math.round(review.rating / 2) ? "gold" : "none"}
                        color={star <= Math.round(review.rating / 2) ? "gold" : "gray"}
                        size={16}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-300">{review.rating}/10</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </div>
              </div>
              <p className="text-gray-200">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-ticketeer-purple-dark rounded-md">
          <p className="text-gray-300">No reviews yet. Be the first to leave a review!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
