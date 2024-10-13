import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

const Notification = ({ user }) => {
    const [notifications, setNotifications] = useState([]); 

    useEffect(() => {
            if (!user || !user.uid) return;

            const unsubscribe = onSnapshot(collection(db, 'notifications'), (snapshot) => {
                 const userNotifications = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() })) 
                .filter(notification => notification.userId === user.uid); 
            setNotifications(userNotifications); 
        });

        return () => unsubscribe(); 
    }, [user]); 

        const markAsRead = async (notificationId) => {
        const notificationRef = doc(db, 'notifications', notificationId); 
        await updateDoc(notificationRef, { read: true }); 
    };

    return (
        <div>
            <h3>Notifications</h3>
            {notifications.length === 0 ? (
                <p>No notifications</p>
            ) : (
                notifications.map((notification) => (
                    <div key={notification.id} style={{ border: '1px solid #ccc', margin: '5px', padding: '10px' }}>
                        <p>{notification.message}</p>
                        <button onClick={() => markAsRead(notification.id)}>Mark as Read</button>
                        {notification.read && <span> (Read)</span>}
                    </div>
                ))
            )}
        </div>
    );
};

export default Notification;
