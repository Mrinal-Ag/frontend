import React, { useState, useEffect, useRef } from "react";
import "./EditProfile.css";
import Home from "../Home/Home";
import Navbar from "../../header/Navbar";
import { useNavigate } from "react-router-dom";
import '../../../fonts/fonts.css'
import upload_img from '../../assets/upload_img.png'

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../auth/firebase'; // Adjust the path as per your project structure
import { signInWithMicrosoft, signOut, auth } from '../../../auth/firebase';

function EditProfile() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [Data, setData] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if image URL exists in browser storage
    const storedImageUrl = localStorage.getItem('uploadedImageUrl');
    if (storedImageUrl) {
      setUrl(storedImageUrl);
    }
  }, []);

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
      const newImage = e.target.files[0];
      setImage(newImage);
    }
  };


  // Function to handle uploading image to Firebase storage
  const handleImageUpload = () => {
    const storageRef = ref(storage, `${user.email}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track upload progress if needed
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Once upload is complete, get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadUrl) => {
            console.log(downloadUrl);
            setUrl(downloadUrl);
            // Save image URL to browser storage
            localStorage.setItem('uploadedImageUrl', downloadUrl);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      }
    );
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({
      ...Data,
      [name]: value,
    });
  };

  // Function to handle submitting form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image first
    if (image) {
      await handleImageUpload();
    }

    // Proceed with form submission
    console.log(Data);

    // Create the DataSend object with the image URL (assuming `url` is the state holding the image URL)
    const DataSend = {
      imageUrl: url,
      userid: user?.uid,
      age: parseInt(Data.age),
      name: user?.displayName,
      email: user?.email,
      institute: Data.institute,
      branch: Data.branch,
      interest: Data.interest,
      course: Data.course,
      skills: [
        {
          skill: Data.skills,
          experience: Data.experience,
          tools: Data.tools,
          level: Data.level,
        },
      ],
    };

    try {
      const response = await fetch(
        `${SERVER_URL}/api/profileModel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(DataSend),
        }
      );

      console.log("Data posted to backend successfully");
      navigate('/profile'); 
    } catch (error) {
      console.error("Error posting data to backend:", error);
    }
  };

  
  const [skill, setSkill] = useState(
    JSON.parse(localStorage.getItem("skills")) || []
  );
  const [inputSkill, setInputSkill] = useState("");

  const addskill = (e) => {
    if (Data.skills.trim() === "") {
      window.alert("Add skill first!");
    } else {
      const newSkill = {
        id: skill.length,
        name: Data.skills,
        // You can add more project details here
      };
      setInputSkill(""); // Reset the input after adding the skill
      setSkill([...skill, newSkill]);
      setData("");
      document.getElementById("skills").value = '';
      document.getElementById("level").value = '';
      document.getElementById("experience").value = '';
      document.getElementById("tools").value = '';
    }
  };
  const removeSkill = (id) => {
    const updatedSkills = skill.filter((s) => s.id !== id);
    setSkill(updatedSkills);
  };

  useEffect(() => {
    // Save skill data to localStorage whenever it changes
    localStorage.setItem("skills", JSON.stringify(skill));
  }, [skill]);


  const [user, setUser] = useState(null); 


  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser); // Update user state
    });
  
    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);
  
const imageClickRef = useRef(null);

const handleImageClick = () =>{
  imageClickRef.current.click(); 
}

  

  return (
    <div className="EditProfile">
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="text-title">
          <h1>EDIT PROFILE</h1>
          <button type="submit">Save</button>
        </div>

        <div className="main-box">
          <div className="left-box">
            <div className="details">Details</div>
            <div className="photo" >
            <div className="photo-1" onClick={handleImageClick}>
      <img src={url || {upload_img}} alt="Uploaded images" height="80" width="80" />
      {/* <br /> */}
      <input type="file" onChange={handleChange} ref={imageClickRef} style={{display: "none"}}/>
          </div>
      <button className="photo-upload" type="button" onClick={handleImageUpload}>Upload</button>


      {/* <br /> */}
      
              
            </div>

            <div className="userid">
              USER ID
              <input
                type="text"
                id="userid"
                placeholder="make unique"
                name="userid"
                value={user?.uid || ' Loading...'}
              readOnly
              />
            </div>
            <div className="name">
  NAME
  <input
    type="text"
    id="name"
    placeholder="Rishi Kiran"
    name="name"
    value={user?.displayName || 'Loading ...'} // Use optional chaining and provide a default value
    readOnly
  />


            </div>
            <div className="age">
              AGE
              <input
                type="text"
                id="age"
                placeholder="18"
                name="age"
                value={Data.age}
                onChange={handleInput}
              />
            </div>
            <div className="course-ep">
              COURSE
              <input
                type="text"
                id="course"
                placeholder="Btech"
                name="course"
                value={Data.course}
                onChange={handleInput}
              />
            </div>
            <div className="branch">
              BRANCH
              <input
                type="text"
                id="branch"
                placeholder="ECE"
                name="branch"
                value={Data.branch}
                onChange={handleInput}
              />
            </div>
            <div className="interest">
              INTEREST
              <input
                type="text"
                id="interest"
                placeholder="Web Development, Design, Robotics"
                name="interest"
                value={Data.interest}
                onChange={handleInput}
              />
              {/* <label for="interest" type="text" id="interest" placeholder='Web Development, Design, Robotics' name="interest" value={Data.interest} onChange={handleInput}>Interests</label>
                <select id="interest" name="intererst">
                  <option value=""></option>
                </select> */}
            </div>
            <div className="institute">
              INSTITUTE
              <input
                placeholder="IIT Guwahati"
                type="text"
                id="institute"
                name="institute"
                value={Data.institute}
                onChange={handleInput}
              />
            </div>
            <div className="email">
              EMAIL
              <input
                placeholder="example@iitg.ac.in"
                type="text"
                id="email"
                name="email"
                value={user?.email || ' Loading...'}
               readOnly
              />
            </div>
          </div>
          <div className="right-box">
            <div className="expertise">Expertise</div>
            <div className="skill">
              SKILL
              <input
                placeholder="Name of skill"
                type="text"
                id="skills"
                name="skills"
                value={Data.skills}
                onChange={handleInput}
              />
            </div>
            <div className="level">
              LEVEL
              <input
                type="text"
                id="level"
                name="level"
                value={Data.level}
                onChange={handleInput}
              />
            </div>
            <div className="experience">
              EXPERIENCE
              <textarea
                type="text"
                id="experience"
                name="experience"
                value={Data.experience}
                onChange={handleInput}
                placeholder="add some experience"
              />
            </div>
            <div className="tool">
              TOOL
              <input
                type="text"
                id="tools"
                name="tools"
                value={Data.tools}
                onChange={handleInput}
                placeholder="Add Used Tools"
              />
            </div>

            <span onClick={addskill} className="skill-ep">
              Add Skill
            </span>

            <div className="skills-add">
              <div className="added">Added Skills :</div>
              <div className="skill-container">
                {skill.map((s) => (
                  <div key={s.id} className="skill-card-ep">
                    <span
                      className="skill-butt-ep"
                      
                    >
                      {s.name} <p onClick={() => removeSkill(s.id)}>X</p>
                    </span>
                    {/* More project details can go here */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
