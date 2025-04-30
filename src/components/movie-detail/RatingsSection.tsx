
import RatingCircle from '@/components/RatingCircle';

interface RatingsSectionProps {
  userRating: number;
}

const RatingsSection = ({ userRating }: RatingsSectionProps) => {
  return (
    <div className="bg-ticketeer-purple-dark p-6 rounded-md mb-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Ratings</h2>
      
      <div className="flex justify-around">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <RatingCircle rating={userRating} size="lg" />
          </div>
          <span className="text-sm text-gray-400">User Score</span>
        </div>
        
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <RatingCircle rating={7.9} size="lg" color="#3498db" />
          </div>
          <span className="text-sm text-gray-400">Critics Score</span>
        </div>
        
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <RatingCircle rating={8.2} size="lg" color="#9b59b6" />
          </div>
          <span className="text-sm text-gray-400">Ticketeer Score</span>
        </div>
      </div>
    </div>
  );
};

export default RatingsSection;
