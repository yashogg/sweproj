
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ReviewFormProps {
  onSubmitReview: (rating: number, comment: string) => void;
}

const ReviewForm = ({ onSubmitReview }: ReviewFormProps) => {
  const [rating, setRating] = useState<number>(8);
  const [comment, setComment] = useState<string>('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating < 1 || rating > 10) {
      toast({
        title: "Invalid Rating",
        description: "Please select a rating between 1 and 10",
        variant: "destructive"
      });
      return;
    }
    
    if (!comment.trim()) {
      toast({
        title: "Missing Comment",
        description: "Please write a comment for your review",
        variant: "destructive"
      });
      return;
    }
    
    onSubmitReview(rating, comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h3 className="text-lg font-medium mb-3">Write a Review</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Rating (1-10)</label>
        <div className="flex space-x-1">
          {[...Array(10)].map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setRating(index + 1)}
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                index < rating ? 'bg-yellow-500 text-yellow-900' : 'bg-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="comment">
          Your Review
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 bg-ticketeer-purple-darker text-white rounded-md"
          rows={4}
          placeholder="Share your thoughts about the movie..."
        ></textarea>
      </div>
      
      <Button type="submit" variant="default" className="w-full">
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;
