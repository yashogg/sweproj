
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import RatingCircle from './RatingCircle';

interface MovieCardWithStatusProps {
  id: string; // Changed from number to string to match Supabase data
  title: string;
  imagePath: string;
  rating: number;
  status: 'Now Playing' | 'Upcoming';
}

const MovieCardWithStatus = ({ id, title, imagePath, rating, status }: MovieCardWithStatusProps) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 bg-gradient-to-b from-transparent to-black/50">
      <Link to={`/movies/${id}`} className="block">
        <div className="aspect-[2/3] overflow-hidden relative">
          <img 
            src={imagePath} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
          
          {/* Status badge */}
          <Badge 
            className={`absolute top-2 right-2 ${
              status === 'Now Playing' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {status}
          </Badge>
          
          {/* Rating circle */}
          <div className="absolute bottom-2 left-2">
            <RatingCircle rating={rating} />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <h3 className="font-bold text-sm md:text-base line-clamp-2">
              {title}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCardWithStatus;
