
import { Calendar, Clock, Film } from 'lucide-react';

interface MovieHeroProps {
  title: string;
  tagline: string;
  releaseDate: string;
  duration: string;
  genres: string[];
  backdrop?: string; // Add backdrop prop
}

const MovieHero = ({ title, tagline, releaseDate, duration, genres, backdrop }: MovieHeroProps) => {
  const backgroundStyle = backdrop 
    ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backdrop})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: '#2D1B4E' }; // Default background if no backdrop

  return (
    <section className="relative h-[70vh]" style={backgroundStyle}>
      <div className="container mx-auto h-full flex items-end pb-16 px-5">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white">{title}</h1>
          <p className="text-ticketeer-yellow text-lg mb-6">{tagline}</p>
          
          <div className="flex flex-wrap items-center space-x-8 mb-8">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-white" />
              <span className="text-sm text-white">{releaseDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-white" />
              <span className="text-sm text-white">{duration}</span>
            </div>
            <div className="flex items-center">
              <Film className="w-4 h-4 mr-2 text-white" />
              <span className="text-sm text-white">{genres.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieHero;
