import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from './firebase';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
  lastLogin: Date;
}

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Save/update user in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    const userData: UserProfile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: userDoc.exists() ? userDoc.data().createdAt.toDate() : new Date(),
      lastLogin: new Date()
    };
    
    await setDoc(userRef, userData, { merge: true });
    
    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Cross-app SSO: ParikshaSathi se aane par URL token se auto sign-in
// Same Firebase project share karte hain — browser IndexedDB se auth state persist hoti hai.
// Agar user already signed in hai (same browser) to onAuthStateChanged automatically fire karega.
// ps_uid param se user info pre-fill karte hain UI mein jab tak auth state load ho.
export const autoSignInFromUrl = async (): Promise<User | null> => {
  const params = new URLSearchParams(window.location.search);
  const hasToken = params.has('ps_token') || params.has('ps_uid');
  if (!hasToken) return null;

  // Clean params from URL without page reload
  const cleanUrl = window.location.pathname + window.location.hash;
  window.history.replaceState({}, '', cleanUrl);

  // Same Firebase project — auth state is already persisted in browser IndexedDB.
  // Just wait for onAuthStateChanged to fire (handled in AppHeader).
  // Return current user if already available.
  return auth.currentUser;
};
