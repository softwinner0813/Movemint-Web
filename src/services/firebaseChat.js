// firebaseChat.js
import { collection, addDoc, query, getDocs, where, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { db } from './firebase'; // Firebase initialization

/**
 * Creates a new chat room in Firestore
 * @param {Object} otherUser - The user you want to create a room with
 * @param {Object} currentUser - The current user (logged-in user)
 * @returns {Promise} The newly created room document
 */
export const createRoom = async (userIds) => {
    try {

        // Step 2: Query Firestore for rooms that contain all of the provided user IDs
        const sortedUserIds = [...userIds].sort();

        const roomsQuery = query(
            collection(db, 'rooms'),
            where('userIds', 'array-contains-any', userIds)
        );

        const querySnapshot = await getDocs(roomsQuery);

        // Step 3: Check if there's an existing room with the exact same userIds
        let existingRoom = null;
        querySnapshot.forEach((doc) => {
            const roomData = doc.data();
            // Sort the userIds in the room for comparison
            const sortedRoomUserIds = [...roomData.userIds].sort();

            // Check if the room has the exact same users (both arrays must match in length and content)
            if (JSON.stringify(sortedRoomUserIds) === JSON.stringify(sortedUserIds)) {
                existingRoom = { id: doc.id, ...roomData };
            }
        });

        // Step 4: If room exists, return the existing room
        if (existingRoom) {
            return existingRoom;
        }

        // Ensure all fields have valid values, use null for optional fields
        const roomData = {
            userIds: userIds || [], // Ensure this is always an array
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            imageUrl: null, // Set to null explicitly
            metadata: {}, // Default to empty object if metadata is not provided
            name: null, // Explicitly set to null if there's no room name
            type: "direct", // Define the type of chat room (e.g., "direct" for direct messages)
            userRoles: null // Optional: Add roles here if necessary, otherwise null
        };

        // Add the room to Firestore
        const roomRef = await addDoc(collection(db, 'rooms'), roomData);

        // Return the created room data along with its ID
        return { id: roomRef.id, ...roomData };
    } catch (error) {
        console.error(error);
    }
};

export const listenToRoomsForUser = (userId, callback) => {
    try {
        const roomsCollection = collection(db, 'rooms'); // Reference to 'rooms' collection
        const q = query(roomsCollection, where('userIds', 'array-contains', userId)); // Query rooms with specific userId

        // Listen to real-time updates
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const roomsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Call the provided callback with the list of rooms
            callback(roomsList);
        });

        return unsubscribe;  // Return the unsubscribe function to stop listening later
    } catch (error) {
        console.error("Error listening to rooms for user:", error);
    }
};
