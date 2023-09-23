/* eslint-disable react/jsx-filename-extension */
// AppContext.js (Manages a context for managing user state)
import React, {
  createContext, useContext, useState, useEffect, useMemo,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../firebase-config';
import { logOutUser } from './Auth';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Firebase's onAuthStateChanged to listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user); // Set the user state to the authenticated user
      } else {
        // No user is signed in
        setUser(null); // Set the user state to null
      }
    });
    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    await logOutUser();
    setUser(null);
  };

  // Wrap the context value in useMemo to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ user, logOut }), [user]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
