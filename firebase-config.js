/* eslint-disable import/no-extraneous-dependencies */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBB3eyW4_T77-ie4A_hoxMoU0BOzzf9T18',
  authDomain: 'todolistapp-7b289.firebaseapp.com',
  projectId: 'todolistapp-7b289',
  storageBucket: 'todolistapp-7b289.appspot.com',
  messagingSenderId: '401926095193',
  appId: '1:401926095193:web:8cb8dc0128093e6a610c48',
  measurementId: 'G-V26QCZKRYK',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const storage = getStorage(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firebase Authentication and get a reference to the service
export default auth;
