
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase'; 

const ReplyToComment = ({ discussionId, parentCommentId, user }) => {
  const [reply, setReply] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'discussions', discussionId, 'comments'), {
        content: reply,
        createdBy: user.displayName,
        createdAt: serverTimestamp(),
        parentCommentId: parentCommentId, 
      });

      setReply('');
      alert("Reply added successfully!");
    } catch (error) {
      console.error("Error adding reply: ", error);
    }
  };

  return (
    <div>
      <h4>Reply to Comment</h4>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={reply} 
          onChange={(e) => setReply(e.target.value)} 
          placeholder="Add your reply..." 
          required 
        />
        <button type="submit">Submit Reply</button>
      </form>
    </div>
  );
};

export default ReplyToComment;
