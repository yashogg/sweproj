
import StatusBadge from './StatusBadge';
import Synopsis from './Synopsis';
import CastSection from './CastSection';
import RatingsSection from './RatingsSection';
import ReviewsSection from './ReviewsSection';
import { ReviewItem } from '../../services/types';

interface CastMember {
  name: string;
  character: string;
  photo: string;
}

interface MovieDetailsProps {
  description: string;
  cast: CastMember[];
  rating: number;
  status: 'Now Playing' | 'Upcoming' | 'Finished';
  reviews: ReviewItem[];
}

const MovieDetails = ({ 
  description, 
  cast, 
  rating, 
  status, 
  reviews 
}: MovieDetailsProps) => {
  return (
    <div className="md:w-2/3">
      {/* Status Badge */}
      <StatusBadge status={status} />
      
      {/* Synopsis */}
      <Synopsis description={description} />
      
      {/* Cast Section */}
      <CastSection cast={cast} />
      
      {/* Ratings */}
      <RatingsSection userRating={rating} />
      
      {/* Reviews Section */}
      <ReviewsSection initialReviews={reviews} />
    </div>
  );
};

export default MovieDetails;
