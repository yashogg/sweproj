
interface MovieHeroProps {
  title: string;
  releaseDate: string;
  duration: string;
  genres: string[];
  backdrop: string;
}

const MovieHero = ({ title, releaseDate, duration, genres, backdrop }: MovieHeroProps) => {
  return (
    <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${backdrop})`,
          backgroundPosition: 'center 20%'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      <div className="container mx-auto px-5 relative h-full flex flex-col justify-end pb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {genres.map((genre, index) => (
            <span 
              key={index} 
              className="px-3 py-1 text-xs font-medium text-white bg-gray-800 bg-opacity-70 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
        
        <div className="flex items-center text-white">
          {releaseDate && (
            <div className="flex items-center mr-6">
              <span className="text-sm">{releaseDate}</span>
            </div>
          )}
          
          {duration && (
            <div className="flex items-center">
              <span className="text-sm">{duration}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
