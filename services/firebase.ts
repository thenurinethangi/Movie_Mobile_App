import { initializeApp } from "firebase/app";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDQAiQvZaWSrX74ldSkLOwh3G0Kcn9j1Hw",
    authDomain: "movie-app-57abd.firebaseapp.com",
    projectId: "movie-app-57abd",
    storageBucket: "movie-app-57abd.firebasestorage.app",
    messagingSenderId: "599436596448",
    appId: "1:599436596448:web:e941ffb6ffb853bdcd2c85",
    measurementId: "G-YL4XK6938N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);