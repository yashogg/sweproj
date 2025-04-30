
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-ticketeer-purple-darker py-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
          Welcome to Ticketeer
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
          Your premier destination for booking movie tickets online. 
          Browse now playing and upcoming movies.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
