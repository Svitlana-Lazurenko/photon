import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBMwf9pRIoWTOEuUfsPUN2u2FNUKd-ZPKo',
  authDomain: 'photon-id.firebaseapp.com',
  projectId: 'photon-id',
  storageBucket: 'photon-id.appspot.com',
  messagingSenderId: '465807820499',
  appId: '1:465807820499:web:51d50f014e025011077626',
  measurementId: 'G-Q1VJLY4EY8',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
