// getUserID.js

import { auth } from 'firebase/auth'; // Import the auth module from Firebase

// Function to get the user ID
function getUserID() {
  const user = auth.currentUser;

  if (user) {
    // User is signed in
    return user.uid; // Return the user's unique ID
  }
  // No user is signed in
  return null; // Return null or handle as needed
}

export default getUserID;
