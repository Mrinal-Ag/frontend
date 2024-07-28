import React, { useState, useEffect, useRef} from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth } from '../../../auth/firebase';
import { getStorage } from 'firebase/storage';
import upload_img from '../../assets/upload_img.png'
import './projectimage.css'

const ImageUpload = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  
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
    if (!image) {
      console.error('No image selected.');
      return;
    }

    const storageRef = ref(getStorage(), `${user.email}/project/${image.name}`); // Create a reference to the storage path
    setIsVisible(false);

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
          localStorage.setItem('imageURL', downloadURL);
        });
      }
    );
  };

  
const imageClickRef2 = useRef(null);

const handleImageClick2 = () =>{
  imageClickRef2.current.click(); 
}

  return (
    <div >
      <div className='proj-photo' onClick={handleImageClick2}>
        {image ? (
          <img src={url} alt='uploaded image, please wait' style={{height: "20vw", width: "30vw"}}/>
        ) : (
          <img src={upload_img} alt="no image" />
        )}
        {/* <br /> */}
        <input type="file" onChange={handleChange} ref={imageClickRef2} style={{display: "none"}} />

      </div>
      {/* <img src={{upload_img} || url} alt="Uploaded images" height="80" width="80" /> */}
      <button style={{ display: isVisible ? 'block' : 'none' }} className="proj-photo-upload" type="button" onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload;
