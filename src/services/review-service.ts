
import { Review, ReviewItem } from './types';
import { getLocalData, setLocalData, generateId } from './local-storage-service';

export async function getMovieReviews(movieId: string): Promise<Review[]> {
  try {
    const reviews = getLocalData<Review[]>('reviews', []);
    return reviews.filter(review => review.movieId === movieId);
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
}

export async function getUserReview(movieId: string, userId: string): Promise<Review | null> {
  try {
    const reviews = getLocalData<Review[]>('reviews', []);
    return reviews.find(review => review.movieId === movieId && review.userId === userId) || null;
  } catch (error) {
    console.error('Error fetching user review:', error);
    throw error;
  }
}

export async function addReview(review: Omit<Review, 'id' | 'date'>): Promise<Review> {
  try {
    const reviews = getLocalData<Review[]>('reviews', []);
    
    const newReview: Review = {
      ...review,
      id: generateId(),
      date: new Date().toISOString()
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

// Helper function to convert Review to ReviewItem format for UI
export function reviewToReviewItem(review: Review, userName: string = "User"): ReviewItem {
  return {
    id: review.id,
    user: userName,
    rating: review.rating,
    comment: review.comment,
    date: review.date
  };
}

// Get all reviews in ReviewItem format for a movie
export async function getMovieReviewItems(movieId: string): Promise<ReviewItem[]> {
  try {
    const reviews = await getMovieReviews(movieId);
    const profiles = getLocalData('profiles', []);
    
    return reviews.map(review => {
      const profile = profiles.find(p => p.id === review.userId);
      const userName = profile?.name || "Anonymous User";
      
      return reviewToReviewItem(review, userName);
    });
  } catch (error) {
    console.error('Error fetching review items:', error);
    return [];
  }
}
