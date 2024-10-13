
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState({});
  const [userDiscussions, setUserDiscussions] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
    };

    const fetchUserDiscussions = () => {
      const q = query(collection(db, 'discussions'), where('userId', '==', userId));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setUserDiscussions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      return unsubscribe;
    };

    fetchUserData();
    const unsubscribe = fetchUserDiscussions();
    return () => unsubscribe();
  }, [userId]);

  return (
    <div>
      <h2>User Profile</h2>
      <h3>{userData.displayName}</h3>
      <p>Email: {userData.email}</p>
      <h4>Your Discussions:</h4>
      {userDiscussions.map(discussion => (
        <div key={discussion.id}>
          <h5>{discussion.title}</h5>
          <p>{discussion.content}</p>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
