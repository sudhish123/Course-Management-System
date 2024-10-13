import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from './firebase';
import './LikeButton.css'; 

const LikeButton = ({ discussionId, userId }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!discussionId) {
      console.error('Discussion ID is missing');
      return;
    }

    const fetchLikes = () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'discussions', discussionId);
        const docSnap = getDoc(docRef);

        if (docSnap.exists()) {
          const likes = docSnap.data().likes || [];
          setLikeCount(likes.length); 
          setLiked(likes.includes(userId)); 
        }
      } catch (error) {
        console.error('Error fetching likes: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [discussionId, userId]);

  const handleLike = () => {
    if (!discussionId) {
      console.error('Cannot like: Discussion ID is missing');
      return;
    }

    const discussionRef = doc(db, 'discussions', discussionId);
    setLoading(true);

    try {
      if (liked) {
        
        updateDoc(discussionRef, {
          likes: arrayRemove(userId),
        });
        setLikeCount((prevCount) => prevCount - 1);
      } else {
        
        updateDoc(discussionRef, {
          likes: arrayUnion(userId),
        });
        setLikeCount((prevCount) => prevCount + 1); 
      }

      setLiked(!liked);
    } catch (error) {
      console.error('Error updating likes: ', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="like-button-container">
      <button 
        className={`like-button ${liked ? 'liked' : ''}`} 
        onClick={handleLike} 
        disabled={loading} 
      >
        {loading ? 'Loading...' : liked ? 'Unlike' : 'Like'}
      </button>
      <span className="like-count">{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
    </div>
  );
};

export default LikeButton;
