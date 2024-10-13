// src/DiscussionList.js
import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import AddComment from './AddComment';
import CommentList from './CommentList';
import LikeButton from './LikeButton'; // Import LikeButton

const DiscussionList = ({ courseId, user }) => {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'discussions'), where('courseId', '==', courseId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setDiscussions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [courseId]);

  return (
    <div>
      <h3>Discussions</h3>
      {discussions.map((discussion) => (
        <div key={discussion.id} className="discussion-item">
          <h4>{discussion.title}</h4>
          <p>{discussion.content}</p>
          
          <LikeButton discussionId={discussion.id} userId={user.uid} />
          
          <AddComment discussionId={discussion.id} userId={user.uid} />
          
          <CommentList discussionId={discussion.id} />
        </div>
      ))}
    </div>
  );
};

export default DiscussionList;
