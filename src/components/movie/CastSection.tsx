
interface CastMember {
  name: string;
  character: string;
  photo: string;
}

interface CastSectionProps {
  cast: CastMember[];
}

const CastSection = ({ cast }: CastSectionProps) => {
  return (
    <div className="bg-ticketeer-purple-dark p-6 rounded-md mb-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Cast</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cast.map((actor, index) => (
          <div key={index} className="text-center">
            <div className="w-20 h-20 rounded-full bg-ticketeer-purple mx-auto mb-2 overflow-hidden">
              <img src={actor.photo} alt={actor.name} className="w-full h-full object-cover" />
            </div>
            <h4 className="font-semibold text-white text-sm">{actor.name}</h4>
            <p className="text-gray-400 text-xs">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastSection;
