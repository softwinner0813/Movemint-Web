// firebaseMessages.js
import { collection, addDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Adds a message to the messages sub-collection within a specific room
 * @param {string} roomId - The ID of the chat room
 * @param {Object} messageData - The message data to add
 */
export const sendMessage = async (roomId, messageData) => {
  try {
    const message = {
      ...messageData,
      createdAt: serverTimestamp(), // Automatically add the timestamp
      updatedAt: serverTimestamp(),
    };

    // Add the message to the "messages" sub-collection in the specific room
    await addDoc(collection(db, `rooms/${roomId}/messages`), message);

    console.log('Message added successfully');
  } catch (error) {
    console.error('Error adding message:', error);
    throw new Error('Could not add message');
  }
};

export const updateMessage = async (roomId, messageId, messageData) => {
  try {
    const message = {
      ...messageData,
      updatedAt: serverTimestamp(),
    };

    // Add the message to the "messages" sub-collection in the specific room
    const messageRef = doc(db, `rooms/${roomId}/messages`, messageId);
    await setDoc(messageRef, message, { merge: true });

    console.log('Message updated successfully');
  } catch (error) {
    console.error('Error updating message:', error);
    throw new Error('Could not update message');
  }
};
