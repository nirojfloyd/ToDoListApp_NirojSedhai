// // AppContext.js (Create a context for managing user state)
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { logOutUser } from './path-to-auth.js'; // Import your authentication functions

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // You can add logic to check the user's authentication state here
//   useEffect(() => {
//     // For example, you can check if the user is already logged in
//     // and update the user state accordingly.
//     // setUser(loggedInUser);
//   }, []);

//   const logOut = async () => {
//     await logOutUser();
//     setUser(null);
//   };

//   return (
//     <AppContext.Provider value={{ user, logOut }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   return useContext(AppContext);
// };
