
import { Profile } from './types';
import { getLocalData, setLocalData } from './local-storage-service';

export async function getUserProfile(userId: string): Promise<Profile | null> {
  try {
    const profiles = getLocalData<Profile[]>('profiles', []);
    return profiles.find(profile => profile.id === userId) || null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

// Alias for getUserProfile for compatibility
export const getProfile = getUserProfile;

export async function updateUserProfile(userId: string, updates: Partial<Profile>): Promise<Profile | null> {
  try {
    const profiles = getLocalData<Profile[]>('profiles', []);
    const index = profiles.findIndex(profile => profile.id === userId);
    
    if (index === -1) {
      // Profile doesn't exist, create a new one
      const newProfile: Profile = {
        id: userId,
        name: updates.name || null,
        email: updates.email || null,
        phone: updates.phone || null,
        address: updates.address || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      profiles.push(newProfile);
      setLocalData('profiles', profiles);
      return newProfile;
    }
    
    // Update existing profile
    const updatedProfile = {
      ...profiles[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    profiles[index] = updatedProfile;
    setLocalData('profiles', profiles);
    return updatedProfile;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

// Alias for updateUserProfile for compatibility
export const updateProfile = updateUserProfile;

export async function getAllProfiles(): Promise<Profile[]> {
  try {
    return getLocalData<Profile[]>('profiles', []);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
}
