
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../../context/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addReview } from '../../services/review-service';

interface ReviewFormProps {
  onSubmitReview: (rating: number, comment: string) => void;
  onCancel: () => void;
  movieId: string;
}

const ReviewForm = ({ onSubmitReview, onCancel, movieId }: ReviewFormProps) => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to submit a review",
        variant: "destructive"
      });
      return;
    }

    if (reviewForm.comment.trim() === '') {
      toast({
        title: "Review Required",
        description: "Please enter a review comment",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Call the localStorage service to save the review
      if (user?.id) {
        await addReview({
          movie_id: movieId,
          user_id: user.id,
          rating: reviewForm.rating,
          comment: reviewForm.comment
        });
      }
      
      // Call the parent component handler
      onSubmitReview(reviewForm.rating, reviewForm.comment);
      
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your review. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-b border-ticketeer-purple pb-6 mb-6">
      <h3 className="font-bold text-white mb-4">Your Review</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Rating (1-10)</label>
          <Select
            value={reviewForm.rating.toString()}
            onValueChange={(value) => setReviewForm({...reviewForm, rating: parseInt(value)})}
          >
            <SelectTrigger className="w-full max-w-[200px]">
              <SelectValue placeholder="Select Rating" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(10)].map((_, i) => (
                <SelectItem key={i+1} value={(i+1).toString()}>
                  {i+1} {i === 0 ? 'star' : 'stars'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Your Comments</label>
          <textarea 
            className="w-full bg-ticketeer-purple p-3 rounded text-white"
            rows={4}
            value={reviewForm.comment}
            onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
            placeholder="Share your thoughts about this movie..."
          ></textarea>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleSubmit}
            className="bg-ticketeer-yellow text-black hover:bg-yellow-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
          <Button 
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
