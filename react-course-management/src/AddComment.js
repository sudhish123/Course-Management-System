// src/AddComment.js
import React, { useState } from 'react';
import { db } from './firebase'; // Firestore configuration
import { addDoc, collection, Timestamp } from 'firebase/firestore';

const AddComment = ({ discussionId, userId }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === '') return;

    setIsSubmitting(true); 

    try {
      addDoc(collection(db, 'comments'), {
        content, 
        discussionId, 
        userId, 
        timestamp: Timestamp.fromDate(new Date()), 
      });

      setContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        required
        disabled={isSubmitting} 
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Add Comment'}
      </button>
    </form>
  );
};

export default AddComment;
