
interface CastMember {
  name: string;
  character: string;
  photo: string;
}

interface CastSectionProps {
  cast: CastMember[];
}

const CastSection = ({ cast }: CastSectionProps) => {
  if (!cast || cast.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Cast</h2>
      <div className="flex flex-wrap gap-4">
        {cast.map((actor, index) => (
          <div key={index} className="flex-none w-32">
            <img 
              src={actor.photo} 
              alt={actor.name} 
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h3 className="font-medium text-sm">{actor.name}</h3>
            <p className="text-xs text-gray-400">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastSection;
