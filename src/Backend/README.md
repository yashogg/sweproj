
# Ticketeer Backend

This is a simple Express.js backend for the Ticketeer movie booking application. It provides RESTful API endpoints for managing movies, showtimes, orders, and user authentication.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. The server will run on port 3001 by default (http://localhost:3001)

## API Endpoints

### Movies
- GET `/api/movies` - Get all movies
- GET `/api/movies/now-playing` - Get movies that are now playing
- GET `/api/movies/upcoming` - Get upcoming movies
- GET `/api/movies/:id` - Get a specific movie by ID
- POST `/api/movies` - Create a new movie

### Showtimes
- GET `/api/showtimes` - Get all showtimes (can filter by movie_id query parameter)
- GET `/api/showtimes/:id` - Get a specific showtime by ID

### Orders
- GET `/api/orders` - Get all orders (can filter by user_id query parameter)
- POST `/api/orders` - Create a new order

### Authentication
- POST `/api/auth/login` - Login with email and password
- POST `/api/auth/register` - Register a new user

## Data Storage

The application uses JSON files in the `data` directory to store information:
- `movies.json` - Movie data
- `showtimes.json` - Showtime data
- `orders.json` - Order data
- `users.json` - User data
- `reviews.json` - Review data

## Development

For local development, you can modify the data files directly. The server automatically initializes them with empty arrays if they don't exist.
