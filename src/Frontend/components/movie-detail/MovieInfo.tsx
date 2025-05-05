
interface MovieInfoProps {
  director: string;
  studios: string[];
}

const MovieInfo = ({ director, studios }: MovieInfoProps) => {
  return (
    <div className="mt-8 bg-ticketeer-purple-dark p-6 rounded-md">
      <h3 className="font-bold text-xl mb-4 text-white">Movie Info</h3>
      
      <div className="space-y-4">
        {director && (
          <div>
            <h4 className="text-gray-400 text-sm">Director</h4>
            <p className="text-white">{director}</p>
          </div>
        )}
        
        {studios && studios.length > 0 && (
          <div>
            <h4 className="text-gray-400 text-sm">Studios</h4>
            <p className="text-white">{studios.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieInfo;
