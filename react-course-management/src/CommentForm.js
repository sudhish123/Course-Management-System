
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; 

const CommentForm = ({ discussionId }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment) return;

        await addDoc(collection(db, 'comments'), {
            discussionId,
            content: comment,
            createdAt: new Date(),
        });
        setComment(''); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CommentForm;
