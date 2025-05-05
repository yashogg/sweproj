
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react';

interface ReviewProps {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewItem = ({ id, user, rating, comment, date }: ReviewProps) => {
  return (
    <div key={id} className="border-b border-ticketeer-purple pb-4 mb-4 last:border-0">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-white">{user}</h4>
        <div className="flex items-center bg-ticketeer-purple px-2 py-1 rounded">
          <Star className="w-4 h-4 text-ticketeer-yellow mr-1" />
          <span className="text-sm text-white">{rating}/10</span>
        </div>
      </div>
      <p className="text-gray-300 mb-2">{comment}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">{date}</span>
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-white flex items-center text-xs">
            <ThumbsUp className="w-3 h-3 mr-1" /> Helpful
          </button>
          <button className="text-gray-400 hover:text-white flex items-center text-xs">
            <ThumbsDown className="w-3 h-3 mr-1" /> Not Helpful
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
