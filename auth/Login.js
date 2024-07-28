import React, { useState, useEffect } from 'react';
import { signInWithMicrosoft, signOut, auth } from './firebase'; // Import signInWithMicrosoft, signOut, and auth
import './Login.css';

function Login() {
  const [user, setUser] = useState(null); // State to store user data
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        // User is signed in
        setUser(currentUser); // Update user state
        // Store user data in local storage
        localStorage.setItem('user', JSON.stringify(currentUser));
      } else {
        // No user is signed in
        setUser(null); // Update user state
        // Remove user data from local storage
        localStorage.removeItem('user');
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserData = localStorage.getItem('user'); // Retrieve the stored user data

    const user = JSON.parse(storedUserData); // Parse the stored user data from JSON to JavaScript object
        console.log(user); // Log stored user data
        if (user) {
          const response = await fetch(`${SERVER_URL}/api/loginData`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: user })
          });
          
          if (response.ok) {
            
            console.log('Login data saved successfully');
            // Handle success
          } else {
            console.error('Failed to save login data');
            // Handle failure
          }
        }
      } catch (error) {
        console.error('Error while saving login data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  // Function to handle sign-in
  const handleSignIn = async () => {
    try {
      await signInWithMicrosoft(); // Call signInWithMicrosoft function
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(); // Call signOut function
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>React App with Microsoft Authentication</h1>
        <div className="auth">
          {user ? (
            <>
              <p className="user">Welcome, {user.displayName}</p> {/* Display user's display name */}
              <p className="email">Email: {user.email}</p> {/* Display user's email */}
              <button className="btn" onClick={handleSignOut}>Sign out</button>
            </>
          ) : (
            <button className="btn" onClick={handleSignIn}>Sign in with Microsoft</button>
          )}
        </div>
        <div>
        
        </div>
      </header>
    </div>
  );
}

export default Login;
