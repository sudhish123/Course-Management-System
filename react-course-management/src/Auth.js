// src/Auth.js
import React, { useState } from 'react';
import { auth, googleProvider, githubProvider } from './firebase'; 
import { signInWithPopup } from 'firebase/auth';
import './Auth.css'; 

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const signInWithGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider); 
      console.log(result.user);
    } catch (error) {
      setError('Google sign-in failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGitHub = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, githubProvider); 
      console.log(result.user);
    } catch (error) {
      setError('GitHub sign-in failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      console.log("Logged out");
    } catch (error) {
      setError('Logout failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign in</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
          <button onClick={signInWithGitHub}>Sign in with GitHub</button>
        </>
      )}
      {auth.currentUser && (
        <button onClick={handleLogout}>Logout</button>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Auth;
