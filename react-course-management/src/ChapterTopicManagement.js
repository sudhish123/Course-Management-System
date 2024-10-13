
import React, { useEffect, useState } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

const ChapterTopicManagement = ({ courseId }) => {
    const [chapters, setChapters] = useState([]);
    const [chapterTitle, setChapterTitle] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'chapters'), (snapshot) => {
            setChapters(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, []);

    const addChapter = async () => {
        if (chapterTitle.trim() === '') {
            alert('Chapter title is required!');
            return;
        }

        await addDoc(collection(db, 'chapters'), { title: chapterTitle, courseId });
        setChapterTitle('');
    };

    const deleteChapter = async (id) => {
        await deleteDoc(doc(db, 'chapters', id));
    };

    return (
        <div>
            <h3>Chapter Management</h3>
            <input
                type="text"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                placeholder="Chapter Title"
            />
            <button onClick={addChapter}>Add Chapter</button>
            <ul>
                {chapters.map((chapter) => (
                    <li key={chapter.id}>
                        {chapter.title} <button onClick={() => deleteChapter(chapter.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChapterTopicManagement;
