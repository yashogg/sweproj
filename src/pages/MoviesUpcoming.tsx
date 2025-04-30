
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MovieCardWithStatus from '@/components/MovieCardWithStatus';

// Sample movie data - upcoming movies
const upcomingMovies = [
  { id: 13, title: "Dune: Part Two", imagePath: "https://image.tmdb.org/t/p/w300/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg", rating: 8.5 },
  { id: 14, title: "The Marvels", imagePath: "https://image.tmdb.org/t/p/w300/Ag3D9qXjhJ2FUkrlJ0Cv1pgxqYQ.jpg", rating: 7.8 },
  { id: 15, title: "Mission: Impossible 8", imagePath: "https://image.tmdb.org/t/p/w300/NNxYkU70HPurnNCSiCjYAmacwm.jpg", rating: 8.2 },
  { id: 16, title: "Deadpool 3", imagePath: "https://image.tmdb.org/t/p/w300/8sMmAmN2x7mBiNKEX2o0aOTozEB.jpg", rating: 8.7 },
  { id: 17, title: "Fantastic Four", imagePath: "https://image.tmdb.org/t/p/w300/bCXLmCBDnBzdBOAsubxQILcj7Yc.jpg", rating: 7.9 },
  { id: 18, title: "Avatar 3", imagePath: "https://image.tmdb.org/t/p/w300/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", rating: 8.4 },
  { id: 19, title: "Indiana Jones 5", imagePath: "https://image.tmdb.org/t/p/w300/gSlLeXNZ2N6T2au61eBxuOOQPih.jpg", rating: 7.5 },
  { id: 20, title: "The Batman 2", imagePath: "https://image.tmdb.org/t/p/w300/74xTEgt7R36Fpooo50r9T25onhq.jpg", rating: 8.3 },
  { id: 21, title: "Blade", imagePath: "https://image.tmdb.org/t/p/w300/hXgmWPd1SuujRZ4QnKLzrj79PAw.jpg", rating: 7.8 },
  { id: 22, title: "Guardians of the Galaxy Vol. 4", imagePath: "https://image.tmdb.org/t/p/w300/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg", rating: 8.1 },
  { id: 23, title: "Black Panther 3", imagePath: "https://image.tmdb.org/t/p/w300/sv1xJUazXeYqALzczSZ3O6nkH75.jpg", rating: 7.9 },
  { id: 24, title: "Fast & Furious 11", imagePath: "https://image.tmdb.org/t/p/w300/rzRb63TldOKdKydCvWJM8B6EkPM.jpg", rating: 7.0 }
];

const MoviesUpcoming = () => {
  const [movies] = useState(upcomingMovies);

  return (
    <Layout title="Upcoming Movies">
      <div className="bg-gradient-to-b from-ticketeer-purple-darker to-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Coming Soon</h1>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {movies.map(movie => (
            <MovieCardWithStatus
              key={movie.id}
              id={movie.id}
              title={movie.title}
              imagePath={movie.imagePath}
              rating={movie.rating}
              status="Upcoming"
            />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-10 flex justify-center">
          <div className="flex space-x-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-700">
              &lt;
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-ticketeer-purple text-white font-bold">
              1
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-700">
              2
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-700">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MoviesUpcoming;
