
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Film, Calendar } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import MovieSection from '@/components/home/MovieSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import { NOW_PLAYING, UPCOMING } from '@/components/home/MovieData';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const { toast } = useToast();
  
  return (
    <Layout title="Book Movie Tickets Online">
      <HeroSection />
      
      {/* Now Playing Section */}
      <MovieSection
        title="Now Playing"
        icon={<Film className="mr-2" />}
        movies={NOW_PLAYING}
        viewAllPath="/movies/now-playing"
      />
      
      {/* Upcoming Movies Section */}
      <MovieSection
        title="Coming Soon"
        icon={<Calendar className="mr-2" />}
        movies={UPCOMING}
        viewAllPath="/movies/upcoming"
        bgClass="bg-gray-50"
      />
      
      {/* User Benefits Section */}
      <BenefitsSection />
    </Layout>
  );
};

export default Home;
