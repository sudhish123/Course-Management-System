import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase'; 
import LikeButton from './LikeButton'; 
import CommentList from './CommentList'; 

const DiscussionDetail = ({ discussionId, userId }) => {
    const [discussion, setDiscussion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDiscussion = async () => {
            const docRef = doc(db, 'discussions', discussionId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setDiscussion(docSnap.data());
            } else {
                console.log('No such discussion!');
            }
            setLoading(false);
        };

        fetchDiscussion();
    }, [discussionId]);

    if (loading) return <div>Loading discussion...</div>;

    return (
        <div>
            <h4>{discussion.title}</h4>
            <p>{discussion.content}</p>
            <LikeButton discussionId={discussionId} userId={userId} />
            <CommentList discussionId={discussionId} />
        </div>
    );
};

export default DiscussionDetail;
