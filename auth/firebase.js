import { initializeApp } from 'firebase/app';
import { getAuth, OAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // Updated import for storage

const firebaseConfig = {
  apiKey: "AIzaSyB-xAaS27EgvTK8NgGN7r6fobXYN-0-4k8",
  authDomain: "fir-auth-40979.firebaseapp.com",
  databaseURL: "https://fir-auth-40979-default-rtdb.firebaseio.com",
  projectId: "fir-auth-40979",
  storageBucket: "fir-auth-40979.appspot.com",
  messagingSenderId: "337890797576",
  appId: "1:337890797576:web:5689bf6df23eee961f89bd",
  measurementId: "G-8VFK9X7JV6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize storage

const provider = new OAuthProvider('microsoft.com');
provider.setCustomParameters({
  tenant: '850aa78d-94e1-4bc6-9cf3-8c11b530701c'
});

// Function to sign in with Microsoft
export const signInWithMicrosoft = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Export auth, provider, and storage
export { auth, provider, storage };
