
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import CommentList from './CommentList';
import AddComment from './AddComment';
import LikeButton from './LikeButton';

const PostDetails = ({ user }) => {
    const { courseId, postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const docRef = doc(db, 'courses', courseId, 'posts', postId);
            const postDoc = await getDoc(docRef);
            if (postDoc.exists()) {
                setPost({ id: postId, ...postDoc.data() });
            } else {
                console.error("No such post!");
            }
        };

        fetchPost();
    }, [courseId, postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{post.title}</h2>
            {post.mediaUrl && (
                <div>
                    <img src={post.mediaUrl} alt="post-media" width="300px" />
                </div>
            )}
            <p>{post.content}</p>
            <LikeButton itemId={post.id} type="post" user={user} />
            <AddComment postId={post.id} courseId={courseId} user={user} />
            <CommentList postId={post.id} courseId={courseId} user={user} />
        </div>
    );
};

export default PostDetails;
