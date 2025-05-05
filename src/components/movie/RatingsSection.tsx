
interface RatingsSectionProps {
  userRating: number;
}

const RatingsSection = ({ userRating }: RatingsSectionProps) => {
  const getColor = () => {
    if (userRating >= 8) return 'text-green-500';
    if (userRating >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  return (
    <div className="bg-ticketeer-purple-dark p-6 rounded-md mb-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Ratings</h2>
      
      <div className="flex justify-around">
        <div className="text-center">
          <div className={`text-5xl font-bold ${getColor()} mb-2`}>
            {userRating.toFixed(1)}
          </div>
          <span className="text-sm text-gray-400">User Score</span>
        </div>
        
        <div className="text-center">
          <div className="text-5xl font-bold text-blue-500 mb-2">
            7.9
          </div>
          <span className="text-sm text-gray-400">Critics Score</span>
        </div>
        
        <div className="text-center">
          <div className="text-5xl font-bold text-purple-500 mb-2">
            8.2
          </div>
          <span className="text-sm text-gray-400">Ticketeer Score</span>
        </div>
      </div>
    </div>
  );
};

export default RatingsSection;
