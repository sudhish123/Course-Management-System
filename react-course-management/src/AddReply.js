import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

const AddReply = ({ commentId, discussionId }) => {
    const [replyContent, setReplyContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'discussions', discussionId, 'comments', commentId, 'replies'), {
                content: replyContent,
                createdAt: new Date()
            });
            setReplyContent(''); 
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add a reply"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                required
            />
            <button type="submit">Reply</button>
        </form>
    );
};

export default AddReply;
