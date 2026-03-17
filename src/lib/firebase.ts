import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD3RPAk3vw5lfy5gD_WVl5TW-qVgX8yk7c",
  authDomain: "sangamkrishna-48c6e.firebaseapp.com",
  projectId: "sangamkrishna-48c6e",
  storageBucket: "sangamkrishna-48c6e.firebasestorage.app",
  messagingSenderId: "1040109761923",
  appId: "1:1040109761923:web:a02e99e55ba9fd3a32f5e1",
  measurementId: "G-E5PF17MLJL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
