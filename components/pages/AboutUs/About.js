import React from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./About.css";
import abtwow from "../../assets/abt-wow.png";
import abtimg1 from "../../assets/abt-img1.png";
import abtimg21 from "../../assets/image10.png";
import abtimg3 from "../../assets/abt-img3.png";
import { useNavigate } from "react-router-dom";
import { signInWithMicrosoft, signOut, auth } from "../../../auth/firebase";

const About = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Update user state
      if (currentUser) {
        // If user is signed in, store the username and email in local storage
        localStorage.setItem("username", currentUser.displayName);
        localStorage.setItem("email", currentUser.email);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to handle sign-in
  const handleSignIn = async () => {
    try {
      await signInWithMicrosoft();
      navigate("/EditProfile");
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  // Use the useRef hook to create a reference to the animated div
  const animatedDivRef = useRef(null);

  // Use the useEffect hook to set up the Intersection Observer
  useEffect(() => {
    const options = {
      threshold: 0.5, // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (animatedDivRef.current) {
      observer.observe(animatedDivRef.current);
    }

    // Clean up the observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="About-boss">
      {/* NAVBAR  */}
      <nav className="Navbar-abt">
        <div className="About-logo">CampusCollaborator</div>
        {user ? (
          <>
            {/* Display user information and sign-out button */}
            <p className="user-1">Welcome, {user.displayName}</p>
            {/* <p className="email">Email: {user.email}</p> */}
            <button className="btn" onClick={handleSignOut}>
              Sign out
            </button>
          </>
        ) : (
          <>
          <div className="well-bt">
            <button className="querie" onClick={handleSignIn}>
              Getting Started
            </button>
            <button className="course" onClick={handleSignIn}>
              Signup with Outlook
            </button>
            </div>
          </>
        )}
      </nav>

      {/* MAIN CONTENT  */}
      <div className="about-main">
        <div className="welcome">
          <div className="well-content">
            <div className="well-text">
              <div className="well-header">
                Create and Collaborate with students across the country.
              </div>
              <div className="well-write">
                Welcome to CampusCollaborate, the ultimate platform designed to
                empower students by fostering collaboration and innovation. Our
                mission is to connect students across various disciplines and
                institutions, enabling them to work together on diverse
                projects, share knowledge, and achieve their academic and
                professional goals.
              </div>
            </div>

            {user ? (
              <>
                {/* Display user information and sign-out button */}
                <p className="user-2">Welcome, {user.displayName}</p>
                {/* <p className="email">Email: {user.email}</p> */}
                {/* <button className="btn" onClick={handleSignOut}>Sign out</button> */}
                <div className="well-btn">
                  <Link to="/Home" className="sign-up">
                    Home
                  </Link>
                  <Link to="/Editprofile" className="sign-up">
                    Complete your Profile
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="well-btn">
                  <button className="sign-up" onClick={handleSignIn}>
                    Signup with Outlook
                  </button>
                  <button className="log" onClick={handleSignIn}>
                    Login
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="well-img">
            <img className="wow" src={abtwow}></img>
          </div>
        </div>
      </div>

      {/* MORE INFO  */}
      <div className="more">
        <div className="more-boxes">
          <div className="more-content">
            CONTENT
            <div className="more-para">
              <p>
                Unleash Your Creativity: share, showcase, and inspire with our
                seamless project upload feature
              </p>
              <p>
                Upload and update your projects and maintain a professional
                portfolio on CampusCollaborate
              </p>
            </div>
          </div>
          <div className="more-img">
            <img src={abtimg1}></img>
          </div>
        </div>
        <div className="more-boxes">
          <div className="more-content">
            COLLABORATE
            <div className="more-para">
              <p>
                Foster Collaboration, Ignite Innovation: Connect with peers,
                collaborate on projects, and Amplify your learning experience
              </p>
              <p>
                Share ideas, split tasks, and achieve more together. Our feature
                makes collaboration easy, so you can ace your projects
              </p>
            </div>
          </div>
          <div className="more-img2">
            <img src={abtimg21}></img>
            <div className="more-frame">
              <div className="more-div1">Open to Collab</div>
              <div className="more-div2">Send Request</div>
            </div>
          </div>
        </div>
        <div className="more-boxes">
          <div className="more-content">
            CONNECT
            <div className="more-para">
              <p>
                Elevate Your Learning Community: Share knowledge, solve doubts,
                and discover new courses together
              </p>
              <p>
                Upload and update your projects and maintain a professional
                portfolio on CampusCollaborate
              </p>
            </div>
          </div>
          <div className="more-img3">
            <img src={abtimg3}></img>
          </div>
        </div>
      </div>

      {/* PLZ LOGIN  */}
      {/* <div className="abt-login">
              <Link to ="/Login" className="bottom-log1">Sign Up with Outlook</Link>
              <Link to ="/Login" className="bottom-log2">Login</Link>
            </div> */}

      {/* <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
            <script>
              AOS.init();
            </script> */}
    </div>
  );
};
export default About;
