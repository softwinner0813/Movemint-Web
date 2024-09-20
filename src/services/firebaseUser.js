// firebaseUser.js
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase'; // Firebase initialization

/**
 * Creates a user in Firestore after authentication
 */
export const createFirebaseUser = async () => {
  const user = auth.currentUser;

  if (!user) {
    console.log('No authenticated user.');
    return;
  }

  console.log(user);
  const userData = {
    firstName: user.displayName.split(' ')[0],
    lastName: user.displayName.split(' ')[1],
    imageUrl: user.photoURL,
    id: user.uid, // UID from Firebase Authentication
    role: 'mover', // Add a role field, can be 'user' or 'admin'
    metadata: { status: 'active' }, // Add any metadata field you need
    createdAt: serverTimestamp(), // Automatically add the created timestamp
    updatedAt: serverTimestamp(), // Automatically add the updated timestamp
  };

  try {
    // Create or update the user in Firestore
    await setDoc(doc(db, 'users', user.uid), userData);
    console.log('User created/updated successfully:', userData);
  } catch (error) {
    console.error('Error creating/updating user in Firestore:', error);
  }
};
