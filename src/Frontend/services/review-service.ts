
import { Review } from './types';
import { getLocalData, setLocalData, generateId } from './local-storage-service';

export async function getMovieReviews(movieId: string): Promise<Review[]> {
  try {
    const reviews = getLocalData<Review[]>('reviews', []);
    return reviews.filter(review => review.movie_id === movieId);
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
}

export async function getUserReview(movieId: string, userId: string): Promise<Review | null> {
  try {
    const reviews = getLocalData<Review[]>('reviews', []);
    return reviews.find(review => review.movie_id === movieId && review.user_id === userId) || null;
  } catch (error) {
    console.error('Error fetching user review:', error);
    throw error;
  }
}

export async function addReview(review: Omit<Review, 'id' | 'created_at'>): Promise<Review> {
  try {
    const reviews = getLocalData<Review[]>('reviews', []);
    
    const newReview: Review = {
      ...review,
      id: generateId(),
      created_at: new Date().toISOString()
    };
    
    reviews.push(newReview);
    setLocalData('reviews', reviews);
    
    return newReview;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
}

export async function updateReview(id: string, updates: Partial<Review>): Promise<Review> {
  try {
    const reviews = getLocalData<Review[]>('reviews', []);
    const index = reviews.findIndex(review => review.id === id);
    
    if (index === -1) {
      throw new Error(`Review with ID ${id} not found`);
    }
    
    const updatedReview = {
      ...reviews[index],
      ...updates
    };
    
    reviews[index] = updatedReview;
    setLocalData('reviews', reviews);
    
    return updatedReview;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
}

export async function deleteReview(id: string): Promise<void> {
  try {
    const reviews = getLocalData<Review[]>('reviews', []);
    const filteredReviews = reviews.filter(review => review.id !== id);
    setLocalData('reviews', filteredReviews);
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
}
