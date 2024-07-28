import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { signInWithMicrosoft, signOut, auth } from '../../../auth/firebase';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-xAaS27EgvTK8NgGN7r6fobXYN-0-4k8",
  authDomain: "fir-auth-40979.firebaseapp.com",
  databaseURL: "https://fir-auth-40979-default-rtdb.firebaseio.com",
  projectId: "fir-auth-40979",
  storageBucket: "fir-auth-40979.appspot.com",
  messagingSenderId: "337890797576",
  appId: "1:337890797576:web:5689bf6df23eee961f89bd",
  measurementId: "G-8VFK9X7JV6"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

const ImageUpload = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

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

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storageRef = ref(getStorage(app), `${user.email}/${image.name}`); // Create a reference to the storage path
  
    const uploadTask = uploadBytesResumable(storageRef, image);
  
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setUrl(downloadURL);
        });
      }
    );
  };

  const style = {};

  return (
    <div style={style}>
      <img src={url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="80" width="80" />
      <br />
      
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      
    </div>
  );
};

export default ImageUpload;
