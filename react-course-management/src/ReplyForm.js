
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

const ReplyForm = ({ commentId, user }) => {
    const [reply, setReply] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (reply.trim() === '') return;

        await addDoc(collection(db, 'replies'), {
            commentId,
            reply,
            userId: user.uid,
            userName: user.displayName,
            createdAt: new Date(),
        });

        const commentParticipants = [];

        commentParticipants.forEach(async (participantId) => {
            await addDoc(collection(db, 'notifications'), {
                userId: participantId,
                message: `New reply to comment: "${commentId}"`,
                read: false,
            });
        });

        setReply('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write your reply..."
            />
            <button type="submit">Reply</button>
        </form>
    );
};

export default ReplyForm;
