// getUserID.js

import { auth } from 'firebase/auth';

// Function to get the user ID
function getUserID() {
  const user = auth.currentUser;

  if (user) {
    // User is signed in
    return user.uid;
  }
  // No user is signed in
  return null;
}

export default getUserID;
