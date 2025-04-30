
// Sample data for now playing movies
export const NOW_PLAYING = [
  { 
    id: 1, 
    title: "Inception", 
    imagePath: "https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", 
    rating: 8.8,
    releaseDate: "2025-04-15",
    description: "A thief who enters the dreams of others to steal their secrets from their subconscious.",
    genre: "Sci-Fi/Action",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page"
  },
  { 
    id: 2, 
    title: "The Shawshank Redemption", 
    imagePath: "https://image.tmdb.org/t/p/w300/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", 
    rating: 9.3,
    releaseDate: "2025-03-20", 
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre: "Drama",
    cast: "Tim Robbins, Morgan Freeman"
  },
  { 
    id: 3, 
    title: "The Dark Knight", 
    imagePath: "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg", 
    rating: 9.0,
    releaseDate: "2025-04-01",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genre: "Action/Crime",
    cast: "Christian Bale, Heath Ledger, Aaron Eckhart"
  },
  { 
    id: 4, 
    title: "Pulp Fiction", 
    imagePath: "https://image.tmdb.org/t/p/w300/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", 
    rating: 8.9,
    releaseDate: "2025-04-10",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    genre: "Crime/Drama",
    cast: "John Travolta, Uma Thurman, Samuel L. Jackson"
  }
];

// Sample data for upcoming movies
export const UPCOMING = [
  { 
    id: 5, 
    title: "Dune: Part Two", 
    imagePath: "https://image.tmdb.org/t/p/w300/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg", 
    rating: 8.5,
    releaseDate: "2025-06-15",
    description: "The sequel to the critically acclaimed sci-fi epic that continues the journey of Paul Atreides as he unites with the Fremen to seek revenge against the conspirators who destroyed his family.",
    genre: "Sci-Fi/Adventure",
    cast: "Timothée Chalamet, Rebecca Ferguson, Zendaya"
  },
  { 
    id: 6, 
    title: "The Batman", 
    imagePath: "https://image.tmdb.org/t/p/w300/74xTEgt7R36Fpooo50r9T25onhq.jpg", 
    rating: 8.4,
    releaseDate: "2025-05-25",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    genre: "Action/Crime",
    cast: "Robert Pattinson, Zoë Kravitz, Paul Dano"
  },
  { 
    id: 7, 
    title: "Black Panther 2", 
    imagePath: "https://image.tmdb.org/t/p/w300/sv1xJUazXeYqALzczSZ3O6nkH75.jpg", 
    rating: 7.9,
    releaseDate: "2025-07-10",
    description: "The sequel to the groundbreaking superhero film Black Panther continues the legacy of Wakanda and its protector.",
    genre: "Action/Adventure",
    cast: "Letitia Wright, Lupita Nyong'o, Danai Gurira"
  },
  { 
    id: 8, 
    title: "Avatar 3", 
    imagePath: "https://image.tmdb.org/t/p/w300/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", 
    rating: 8.2,
    releaseDate: "2025-08-01",
    description: "The third installment in the Avatar franchise continues the exploration of Pandora and the conflict between humans and the Na'vi.",
    genre: "Sci-Fi/Adventure",
    cast: "Sam Worthington, Zoe Saldana, Kate Winslet"
  }
];

// Function to get a movie by ID
export const getMovieById = (id: number) => {
  const allMovies = [...NOW_PLAYING, ...UPCOMING];
  return allMovies.find(movie => movie.id === id);
};

// Function to update a movie
export const updateMovie = (updatedMovie) => {
  if (NOW_PLAYING.some(movie => movie.id === updatedMovie.id)) {
    const index = NOW_PLAYING.findIndex(movie => movie.id === updatedMovie.id);
    NOW_PLAYING[index] = updatedMovie;
  } else if (UPCOMING.some(movie => movie.id === updatedMovie.id)) {
    const index = UPCOMING.findIndex(movie => movie.id === updatedMovie.id);
    UPCOMING[index] = updatedMovie;
  }
  return getMovieById(updatedMovie.id);
};

// Function to delete a movie
export const deleteMovie = (id: number) => {
  const nowPlayingIndex = NOW_PLAYING.findIndex(movie => movie.id === id);
  if (nowPlayingIndex !== -1) {
    NOW_PLAYING.splice(nowPlayingIndex, 1);
    return true;
  }
  
  const upcomingIndex = UPCOMING.findIndex(movie => movie.id === id);
  if (upcomingIndex !== -1) {
    UPCOMING.splice(upcomingIndex, 1);
    return true;
  }
  
  return false;
};

// Function to add a new movie
export const addMovie = (movie) => {
  // Generate a new ID (in a real application, this would be handled by the backend)
  const allMovies = [...NOW_PLAYING, ...UPCOMING];
  const maxId = Math.max(...allMovies.map(m => m.id));
  const newMovie = {
    ...movie,
    id: maxId + 1
  };
  
  // Add to the appropriate list based on status
  if (movie.status === 'nowPlaying') {
    NOW_PLAYING.push(newMovie);
  } else {
    UPCOMING.push(newMovie);
  }
  
  return newMovie;
};
