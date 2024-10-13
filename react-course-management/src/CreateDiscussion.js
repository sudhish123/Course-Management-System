import React, { useState } from 'react';
import { db } from './firebase';
import { addDoc, collection } from 'firebase/firestore';
import './CreateDiscussion.css'; 

const CreateDiscussion = ({ courseId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let mediaUrl = '';


    addDoc(collection(db, 'discussions'), {
      title,
      content,
      mediaUrl,
      courseId,
      likes: [], 
    });

    setTitle('');
    setContent('');
    setMediaFile(null);
  };

  return (
    <div className="create-discussion-container"> 
      <h2>Create Discussion</h2>
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
          onChange={(e) => setMediaFile(e.target.files[0])} 
        />
        <button type="submit">Create Discussion</button>
      </form>
    </div>
  );
};

export default CreateDiscussion;
