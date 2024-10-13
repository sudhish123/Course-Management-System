
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from './firebase'; 
import LikeButton from './LikeButton'; 

const CourseForum = ({ user }) => {
    const { courseId } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!courseId) return;

        const q = query(collection(db, 'courses', courseId, 'posts'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, [courseId]);

    return (
        <div>
            <h2>Discussions for Course: {courseId}</h2>
            <Link to={`/create-post/${courseId}`}><button>Create New Post</button></Link>
            <div>
                {posts.length ? posts.map(post => (
                    <div key={post.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                        <h3>{post.title}</h3>
                        {post.mediaUrl && (
                            <div>
                                <img src={post.mediaUrl} alt="post-media" width="200px" />
                            </div>
                        )}
                        <p>{post.content}</p>
                        <LikeButton itemId={post.id} type="post" user={user} />
                        <Link to={`/post/${courseId}/${post.id}`}>View Comments</Link>
                    </div>
                )) : <p>No posts yet!</p>}
            </div>
        </div>
    );
};

export default CourseForum;
