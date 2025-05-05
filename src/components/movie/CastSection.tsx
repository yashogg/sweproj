
import React from 'react';

interface CastMember {
  name: string;
  character?: string;
  photo?: string;
}

interface CastSectionProps {
  cast: CastMember[];
}

const CastSection = ({ cast }: CastSectionProps) => {
  if (cast.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Cast</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cast.map((member, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="h-32 w-32 rounded-full bg-gray-300 mb-2 overflow-hidden">
              {member.photo ? (
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-ticketeer-purple text-white">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>
            <p className="font-medium text-white">{member.name}</p>
            {member.character && (
              <p className="text-sm text-gray-400">as {member.character}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastSection;
