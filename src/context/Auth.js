/* eslint-disable no-useless-catch */
// auth.js

import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import auth from '../../firebase-config';

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    return user;
  } catch (error) {
    throw error;
  }
};

export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    return user;
  } catch (error) {
    throw error;
  }
};

export const logOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
