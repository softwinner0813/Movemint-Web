import { collection, query, where, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { getName } from "@/lib/utils";

export const listenToNotificationsForUser = (userId, callback) => {
    if (!userId) return () => { };

    try {
        // Reference to notifications collection
        const notificationsRef = collection(db, 'notifications');

        // Create query for notifications where receiverId matches userId
        const q = query(notificationsRef, where('receiverId', '==', userId));

        // Listen to real-time updates
        const unsubscribe = onSnapshot(q, async (snapshot) => {
            // Process notifications and fetch sender details
            const notificationsPromises = snapshot.docs.map(async (docSnapshot) => {
                const notificationData = docSnapshot.data();

                // Fetch sender's details from users collection
                try {
                    // Create a reference to the sender's document
                    const senderRef = doc(db, 'users', notificationData.senderId);
                    const senderSnapshot = await getDoc(senderRef);
                    const senderData = senderSnapshot.data();

                    return {
                        id: docSnapshot.id,
                        ...notificationData,
                        sender: {
                            id: notificationData.senderId,
                            name: getName(senderData?.firstName, senderData?.lastName),
                            email: senderData?.email,
                            avatar: senderData?.avatar
                        },
                        createdAt: notificationData.createdAt?.toDate?.() || notificationData.createdAt,
                    };
                } catch (error) {
                    console.error(`Error fetching sender data for notification ${docSnapshot.id}:`, error);
                    return {
                        id: docSnapshot.id,
                        ...notificationData,
                        sender: {
                            id: notificationData.senderId,
                            name: 'Unknown User'
                        },
                        createdAt: notificationData.createdAt?.toDate?.() || notificationData.createdAt,
                    };
                }
            });

            try {
                // Wait for all sender details to be fetched
                const notifications = await Promise.all(notificationsPromises);

                // Sort notifications by creation date (newest first)
                notifications.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });

                // Call the provided callback with the notifications list
                callback(notifications);
            } catch (error) {
                console.error('Error processing notifications:', error);
                callback([]);
            }
        }, (error) => {
            console.error('Error in notification listener:', error);
            callback([]);
        });

        return unsubscribe;
    } catch (error) {
        console.error("Error setting up notifications listener:", error);
        return () => { };
    }
};