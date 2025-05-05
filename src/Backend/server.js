
// Simple Express server setup for backend API
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Data storage paths
const DATA_DIR = path.join(__dirname, 'data');
const MOVIES_FILE = path.join(DATA_DIR, 'movies.json');
const SHOWTIMES_FILE = path.join(DATA_DIR, 'showtimes.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

// Create data directory if it doesn't exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize data files with empty arrays if they don't exist
const initializeDataFile = (filePath, initialData = []) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
  }
};

initializeDataFile(MOVIES_FILE);
initializeDataFile(SHOWTIMES_FILE);
initializeDataFile(ORDERS_FILE);
initializeDataFile(USERS_FILE, [{ id: 'admin', email: 'admin@ticketeer.com', name: 'Admin User', isAdmin: true }]);
initializeDataFile(REVIEWS_FILE);

// Helper functions to read and write data
const readData = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
};

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    return false;
  }
};

// API Routes

// Movies
app.get('/api/movies', (req, res) => {
  const movies = readData(MOVIES_FILE);
  res.json(movies);
});

app.get('/api/movies/now-playing', (req, res) => {
  const movies = readData(MOVIES_FILE);
  const nowPlaying = movies.filter(movie => movie.status === 'Now Playing');
  res.json(nowPlaying);
});

app.get('/api/movies/upcoming', (req, res) => {
  const movies = readData(MOVIES_FILE);
  const upcoming = movies.filter(movie => movie.status === 'Upcoming');
  res.json(upcoming);
});

app.get('/api/movies/:id', (req, res) => {
  const movies = readData(MOVIES_FILE);
  const movie = movies.find(m => m.id === req.params.id);
  
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  
  res.json(movie);
});

app.post('/api/movies', (req, res) => {
  const movies = readData(MOVIES_FILE);
  const newMovie = {
    ...req.body,
    id: `movie_${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  movies.push(newMovie);
  writeData(MOVIES_FILE, movies);
  
  res.status(201).json(newMovie);
});

// Showtimes
app.get('/api/showtimes', (req, res) => {
  const showtimes = readData(SHOWTIMES_FILE);
  const { movieId } = req.query;
  
  if (movieId) {
    const filteredShowtimes = showtimes.filter(s => s.movie_id === movieId);
    return res.json(filteredShowtimes);
  }
  
  res.json(showtimes);
});

app.get('/api/showtimes/:id', (req, res) => {
  const showtimes = readData(SHOWTIMES_FILE);
  const showtime = showtimes.find(s => s.id === req.params.id);
  
  if (!showtime) {
    return res.status(404).json({ error: 'Showtime not found' });
  }
  
  res.json(showtime);
});

// Orders
app.get('/api/orders', (req, res) => {
  const orders = readData(ORDERS_FILE);
  const { userId } = req.query;
  
  if (userId) {
    const userOrders = orders.filter(o => o.user_id === userId);
    return res.json(userOrders);
  }
  
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const orders = readData(ORDERS_FILE);
  const showtimes = readData(SHOWTIMES_FILE);
  
  const { showtime_id, user_id, seats } = req.body;
  
  // Find the showtime to check available seats
  const showtimeIndex = showtimes.findIndex(s => s.id === showtime_id);
  
  if (showtimeIndex === -1) {
    return res.status(404).json({ error: 'Showtime not found' });
  }
  
  const showtime = showtimes[showtimeIndex];
  
  if (showtime.available_seats < seats) {
    return res.status(400).json({ error: 'Not enough seats available' });
  }
  
  // Create the order
  const newOrder = {
    ...req.body,
    id: `order_${Date.now()}`,
    order_date: new Date().toISOString(),
    payment_status: 'Completed'
  };
  
  // Update available seats
  showtimes[showtimeIndex] = {
    ...showtime,
    available_seats: showtime.available_seats - seats
  };
  
  // Save changes
  orders.push(newOrder);
  writeData(ORDERS_FILE, orders);
  writeData(SHOWTIMES_FILE, showtimes);
  
  res.status(201).json(newOrder);
});

// Users/Auth
app.post('/api/auth/login', (req, res) => {
  const users = readData(USERS_FILE);
  const { email, password } = req.body;
  
  // In a real app, we would compare hashed passwords
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

app.post('/api/auth/register', (req, res) => {
  const users = readData(USERS_FILE);
  const { email, password, name } = req.body;
  
  // Check if user already exists
  if (users.some(u => u.email === email)) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }
  
  // In a real app, we would hash the password
  const newUser = {
    id: `user_${Date.now()}`,
    email,
    password, // This would be hashed in a real app
    name,
    isAdmin: false
  };
  
  users.push(newUser);
  writeData(USERS_FILE, users);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
