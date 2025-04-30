
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Film, Calendar } from 'lucide-react';

const BenefitsSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-ticketeer-purple-darker text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Book with Ticketeer?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-ticketeer-purple-dark bg-opacity-30 rounded-lg">
            <div className="bg-ticketeer-purple rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Film className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Skip the Lines</h3>
            <p>Say goodbye to long queues. Book your tickets online and walk right in.</p>
          </div>
          
          <div className="p-6 bg-ticketeer-purple-dark bg-opacity-30 rounded-lg">
            <div className="bg-ticketeer-purple rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Film className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Latest Movies</h3>
            <p>Get access to the newest releases and exclusive screenings at our theaters.</p>
          </div>
          
          <div className="p-6 bg-ticketeer-purple-dark bg-opacity-30 rounded-lg">
            <div className="bg-ticketeer-purple rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Easy Planning</h3>
            <p>View showtimes, read reviews, and plan your movie night effortlessly.</p>
          </div>
        </div>
        
        <Button 
          onClick={() => navigate('/register')} 
          className="mt-12 btn-primary text-lg"
        >
          Sign Up Now
        </Button>
      </div>
    </section>
  );
};

export default BenefitsSection;
