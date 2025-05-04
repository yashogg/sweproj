
import { NOW_PLAYING, UPCOMING } from '@/components/home/MovieData';
import { migrateMovieData } from '@/services/movie-service';

// Function to import static movie data into Supabase
export async function importMovieData(): Promise<void> {
  // Format the movie data correctly for our Supabase schema
  const nowPlayingMovies = NOW_PLAYING.map(movie => ({
    ...movie,
    status: 'Now Playing'
  }));
  
  const upcomingMovies = UPCOMING.map(movie => ({
    ...movie,
    status: 'Upcoming'
  }));
  
  // Combine and migrate
  const allMovies = [...nowPlayingMovies, ...upcomingMovies];
  await migrateMovieData(allMovies);
  
  console.log('Movie data migration completed');
}
