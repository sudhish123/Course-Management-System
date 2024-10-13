
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase'; 

const CommentList = ({ discussionId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (!discussionId) {
          throw new Error('No discussion ID provided');
        }

        const q = query(collection(db, 'comments'), where('discussionId', '==', discussionId));
        const querySnapshot = await getDocs(q);
        
        const commentsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setComments(commentsArray);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchComments();
  }, [discussionId]);

  if (loading) return <div>Loading comments...</div>;

  if (error) return <div>Error: {error}</div>;

  if (comments.length === 0) return <div>No comments yet.</div>;

  return (
    <div>
      <h5>Comments:</h5>
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item">
          <p>{comment.content}</p>
          <small>Posted by: {comment.userId || 'Anonymous'}</small>
          <small>Posted on: {comment.timestamp ? new Date(comment.timestamp.seconds * 1000).toLocaleString() : 'Unknown'}</small>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
