import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import MovieCard from '@/components/MovieCard';
import { Search, Film } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Sample combined movie data
const allMovies = [
  { id: 1, title: "Spider-Man: No Way Home", imagePath: "https://image.tmdb.org/t/p/w300/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", rating: 8.4 },
  { id: 2, title: "The Batman", imagePath: "https://image.tmdb.org/t/p/w300/74xTEgt7R36Fpooo50r9T25onhq.jpg", rating: 8.0 },
  { id: 13, title: "Dune: Part Two", imagePath: "https://image.tmdb.org/t/p/w300/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg", rating: 8.5 },
  { id: 14, title: "The Marvels", imagePath: "https://image.tmdb.org/t/p/w300/Ag3D9qXjhJ2FUkrlJ0Cv1pgxqYQ.jpg", rating: 7.8 },
  { id: 5, title: "Thor: Love and Thunder", imagePath: "https://image.tmdb.org/t/p/w300/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg", rating: 7.5 },
  // Add more movies here as needed
];

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<typeof allMovies>([]);
  
  // Perform search when the component mounts or search term changes
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [searchParams]);
  
  const performSearch = (query: string) => {
    const filtered = allMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
    performSearch(searchTerm);
  };

  return (
    <Layout title="Search Results">
      <div className="bg-gradient-to-b from-ticketeer-purple-darker to-background py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-6">
            Search Results
          </h1>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Input 
                  type="text" 
                  placeholder="Search for movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="py-6 pl-10 pr-4 text-base"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <Button type="submit" className="bg-ticketeer-purple hover:bg-ticketeer-purple-dark">
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {results.length > 0 ? (
          <div>
            <p className="mb-6 text-lg">
              Found {results.length} result{results.length !== 1 ? 's' : ''} for "{searchParams.get('q')}"
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {results.map(movie => (
                <MovieCard 
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  imagePath={movie.imagePath}
                  rating={movie.rating}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <Film className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No results found</h2>
            <p className="text-gray-600">
              We couldn't find any movies matching "{searchParams.get('q')}"
            </p>
            <p className="mt-4 text-gray-600">
              Try adjusting your search or browse our catalog
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;
