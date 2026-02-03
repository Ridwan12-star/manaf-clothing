import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCZlOoWzPY6Nc5HlNm50h7tICdd2rUNqKg",
    authDomain: "manaf-ff3d7.firebaseapp.com",
    projectId: "manaf-ff3d7",
    storageBucket: "manaf-ff3d7.firebasestorage.app",
    messagingSenderId: "433040617105",
    appId: "1:433040617105:web:b8061d50cc8a81ed249930",
    measurementId: "G-J526PM1D5S"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
