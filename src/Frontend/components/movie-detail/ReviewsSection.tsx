
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ReviewForm from './ReviewForm';
import ReviewItem from './ReviewItem';
import { ReviewItem as ReviewItemType } from '../../services/types';
import { getMovieReviewItems } from '../../services/review-service';
import { initializeLocalData } from '../../services/local-storage-service';

interface ReviewsSectionProps {
  initialReviews?: ReviewItemType[];
  movieId: string;
}

const ReviewsSection = ({ initialReviews, movieId }: ReviewsSectionProps) => {
  const [reviews, setReviews] = useState<ReviewItemType[]>(initialReviews || []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { toast } = useToast();

  // Ensure localStorage is initialized
  useEffect(() => {
    initializeLocalData();
  }, []);

  // Fetch reviews from localStorage if no initialReviews were provided
  useEffect(() => {
    if (!initialReviews && movieId) {
      const fetchReviews = async () => {
        const reviewItems = await getMovieReviewItems(movieId);
        setReviews(reviewItems);
      };
      
      fetchReviews();
    }
  }, [initialReviews, movieId]);

  const handleSubmitReview = (rating: number, comment: string) => {
    // In a real app, this would call the review-service to save the review
    const newReview: ReviewItemType = {
      id: `id_${Date.now()}`,
      user: "CurrentUser", // In a real app, get this from auth context
      rating,
      comment,
      date: new Date().toISOString()
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
          onSubmitReview={handleSubmitReview}
          onCancel={() => setShowReviewForm(false)}
          movieId={movieId}
        />
      )}
      
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-300 text-center py-4">No reviews yet. Be the first to leave a review!</p>
        ) : (
          reviews.map(review => (
            <ReviewItem
              key={review.id}
              id={review.id}
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
