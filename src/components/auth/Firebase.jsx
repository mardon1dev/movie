import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3s-ZZUKkrBIQNzdqt9WDTXm6rhtWjx7A",
  authDomain: "movie-69fd1.firebaseapp.com",
  projectId: "movie-69fd1",
  storageBucket: "movie-69fd1.appspot.com",
  messagingSenderId: "840242487317",
  appId: "1:840242487317:web:107daa55314413f2f2ae1c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app)
export default app;