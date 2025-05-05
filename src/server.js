
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage (in a real app, this would be a database)
let movies = [];
let users = [];
let orders = [];

// Movie routes
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === req.params.id);
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json(movie);
});

app.post('/api/movies', (req, res) => {
  const newMovie = { id: Date.now().toString(), ...req.body };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// User routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ user: { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin } });
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  if (users.some(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = { id: Date.now().toString(), email, password, name, isAdmin: false };
  users.push(newUser);
  res.status(201).json({ user: { id: newUser.id, email: newUser.email, name: newUser.name, isAdmin: newUser.isAdmin } });
});

// Order routes
app.get('/api/orders/:userId', (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.params.userId);
  res.json(userOrders);
});

app.post('/api/orders', (req, res) => {
  const newOrder = { id: Date.now().toString(), ...req.body, date: new Date().toISOString() };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Initialize some sample data
const initializeData = () => {
  movies = [
    {
      id: '1',
      title: 'The Movie',
      description: 'A sample movie description',
      image_path: 'https://via.placeholder.com/300x450',
      release_date: '2025-01-01',
      duration: 120,
      genre: 'Action/Adventure',
      status: 'Now Playing',
      rating: 4.5
    }
  ];
  
  users = [
    {
      id: '1',
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin User',
      isAdmin: true
    }
  ];
};

initializeData();

// Start server
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
