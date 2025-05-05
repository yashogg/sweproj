
import React from 'react';
import StatusBadge from './StatusBadge';
import Synopsis from './Synopsis';
import CastSection from './CastSection';
import RatingsSection from './RatingsSection';
import ReviewsSection from './ReviewsSection';
import { ReviewItem } from '@/services/types';

interface CastMember {
  name: string;
  character?: string;
  photo?: string;
}

interface MovieDetailsProps {
  description: string;
  cast: CastMember[];
  rating: number;
  status: 'Now Playing' | 'Upcoming' | 'Finished';
  reviews: ReviewItem[];
  movieId: string;
}

const MovieDetails = ({
  description,
  cast,
  rating,
  status,
  reviews,
  movieId,
}: MovieDetailsProps) => {
  return (
    <div className="w-full md:w-2/3">
      <div className="mb-4">
        <StatusBadge status={status} />
      </div>
      
      <Synopsis description={description} />
      
      <CastSection cast={cast} />
      
      <RatingsSection rating={rating} />
      
      <ReviewsSection 
        reviews={reviews} 
        movieId={movieId}
      />
    </div>
  );
};

export default MovieDetails;
