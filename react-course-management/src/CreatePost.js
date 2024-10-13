
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase'; 

const CreatePost = ({ user }) => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async () => {
        if (!mediaFile) return null;

        const fileRef = ref(storage, `media/${mediaFile.name}`);
        const uploadTask = uploadBytesResumable(fileRef, mediaFile);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                () => {},
                (error) => reject(error),
                async () => {
                    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadUrl);
                }
            );
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const mediaUrl = await handleFileUpload();

            await addDoc(collection(db, 'courses', courseId, 'posts'), {
                title,
                content,
                mediaUrl,
                authorId: user.uid,
                authorName: user.displayName,
                createdAt: new Date(),
                likes: []
            });

            navigate(`/forum/${courseId}`);
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => setMediaFile(e.target.files[0])}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
