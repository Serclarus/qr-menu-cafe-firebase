// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase config - Bu değerleri Firebase Console'dan alacaksınız
const firebaseConfig = {
    apiKey: "AIzaSyBzi-EFYULTuQvhb9PCyuR4m4w0_TjYKHA",
    authDomain: "thee-bbubb-menu.firebaseapp.com",
    projectId: "thee-bbubb-menu",
    storageBucket: "thee-bbubb-menu.firebasestorage.app",
    messagingSenderId: "514868742515",
    appId: "1:514868742515:web:5aab2539714aea847add06",
    measurementId: "G-Q8E8TVW5HE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Export the app instance
export default app;
