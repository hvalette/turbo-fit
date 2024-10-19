// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD781t1zHQWfWgiFZFQi9zy7IIMWgvopXk',
  authDomain: 'turbo-fit.firebaseapp.com',
  projectId: 'turbo-fit',
  storageBucket: 'turbo-fit.appspot.com',
  messagingSenderId: '296387140985',
  appId: '1:296387140985:web:3560323f04199f2cf4a3a8',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
