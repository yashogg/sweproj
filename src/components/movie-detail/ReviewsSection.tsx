
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ReviewForm from './ReviewForm';
import ReviewItem from './ReviewItem';
import { ReviewItem as ReviewItemType } from '@/services/types';

interface ReviewsSectionProps {
  initialReviews: ReviewItemType[];
  movieId: string;
}

const ReviewsSection = ({ initialReviews, movieId }: ReviewsSectionProps) => {
  const [reviews, setReviews] = useState<ReviewItemType[]>(initialReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { toast } = useToast();

  const handleSubmitReview = (rating: number, comment: string) => {
    // In a real app, this would be an API call to save the review
    const newReview: ReviewItemType = {
      id: `review_${Date.now()}`,
      user: "CurrentUser", // In a real app, get this from auth context
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([...reviews, newReview]);
    setShowReviewForm(false);

    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!"
    });
  };

  return (
    <div className="bg-ticketeer-purple-dark p-6 rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Reviews</h2>
        {!showReviewForm && (
          <Button 
            onClick={() => setShowReviewForm(true)}
            variant="outline"
            className="text-white border-ticketeer-yellow hover:bg-ticketeer-yellow hover:text-black"
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
      
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-300 text-center py-4">No reviews yet. Be the first to leave a review!</p>
        ) : (
          reviews.map(review => (
            <ReviewItem
              key={review.id}
              id={parseInt(review.id) || Math.floor(Math.random() * 1000)}
              user={review.user}
              rating={review.rating}
              comment={review.comment}
              date={review.date}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
