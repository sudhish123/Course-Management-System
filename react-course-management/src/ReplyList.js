
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import LikeButton from './LikeButton'; 

const ReplyList = ({ commentId, discussionId, user }) => {  
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'discussions', discussionId, 'comments', commentId, 'replies'), (snapshot) => {
            setReplies(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, [commentId, discussionId]);

    return (
        <div>
            {replies.map(reply => (
                <div key={reply.id}>
                    <p>{reply.content}</p>
                    <LikeButton id={reply.id} type={`discussions/${discussionId}/comments/${commentId}/replies`} userId={user?.uid} /> {/* Safely access user.uid */}
                </div>
            ))}
        </div>
    );
};

export default ReplyList;
