
interface MovieInfoProps {
  director: string;
  studios: string[];
}

const MovieInfo = ({ director, studios }: MovieInfoProps) => {
  return (
    <div className="mt-8 bg-ticketeer-purple-dark p-6 rounded-md">
      <h3 className="font-bold text-xl mb-4 text-white">Movie Info</h3>
      
      <div className="space-y-4">
        <div>
          <span className="block text-gray-400 text-sm">Director</span>
          <span className="text-white">{director}</span>
        </div>
        
        <div>
          <span className="block text-gray-400 text-sm">Studios</span>
          <span className="text-white">{studios.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
