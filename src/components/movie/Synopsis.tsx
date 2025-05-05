
import React from 'react';

interface SynopsisProps {
  description: string;
}

const Synopsis = ({ description }: SynopsisProps) => {
  return (
    <div className="bg-movie-dark p-6 rounded-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Synopsis</h2>
      <p className="text-gray-200">{description || 'No description available.'}</p>
    </div>
  );
};

export default Synopsis;
