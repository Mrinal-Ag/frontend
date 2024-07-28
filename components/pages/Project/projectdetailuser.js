import React, { useState, useEffect } from "react";
import Navbar from "../../header/Navbar";
import "./projectdetailuser.css";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to extract parameters
import "./Review.css";
import thumbsUp from "../../assets/thumbs-up.png";
import { Link } from "react-router-dom";


const Projectuser = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { projectId } = useParams(); // Extract project ID from URL
  const [projects, setProjects] = useState([]); // Initialize projects state as an empty array
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [profileDetails, setProfileDetails] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const storedUserData = localStorage.getItem("user"); // Retrieve the stored user data

  const user = JSON.parse(storedUserData); // Parse the stored user data from JSON to JavaScript object

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/profile/${user.uid}`)
      .then((Profile) => {
        console.log(Profile);
        setProfiles(Profile.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Fetch project details using project ID
    const fetchProjectDetail = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/Project/${projectId}`
        );
        if (response.data.status === "success") {
          setProjects(response.data.data); // Set projects state to the array of project data
          setComments(response.data.data.comments || []); // Set comments state from fetched project data
        } else {
          console.error(
            "Failed to fetch project details:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetail();
  }, [projectId]);


  useEffect(() => {
    if (projects && projects.length > 0 && projects[0].email) {
      const fetchProfileDetails = async () => {
        try {
          const response = await axios.get(
            `${SERVER_URL}/api/ownerprofile/${projects[0].email}`
          );

          console.log(projects[0].email);
      
          setProfileDetails(response.data.profile);
        
          
        } catch (error) {
          console.error("Error fetching profile details:", error);
        }
      };
      fetchProfileDetails();
    }
  }, [projects]);


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/comments/${projectId}`
        );
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [projectId]);

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/comments`, {
        projectId,
        userName: profiles.name, // Replace with actual username or fetch from authentication
        image: profiles.imageUrl,
        userid : profiles.userid,
        content: newComment,
      });
      console.log(response);
      if (response.data.status === "success") {
        setComments([...comments, response.data.comment]);
        setNewComment("");
      } else {
        console.error("Failed to post comment:", response.data.message);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  //LIKES

  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  const handleLikeClick = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/projectslike/${projectId}/${user.uid}/like`,
        { method: "POST" }
      );
      if (response.ok) {
        setLiked(!liked);
        setTotalLikes((prevTotalLikes) =>
          liked ? prevTotalLikes - 1 : prevTotalLikes + 1
        );
      } else {
        console.error("Failed to update like status");
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };
  //LIKES END
  const renderFieldValue = (field) => {
    // Check if the value of the field is an object
    if (typeof field.value === 'object' && field.value !== null) {
      // If it's an object, stringify it for display
      return JSON.stringify(field.value);
    } else {
      // Check for the specific input type that requires splitting by `;`
      if (field.type === 'code-block') { // Replace 'specialType' with the specific type
        return field.value.split(';').map((part, index) => (
          <div key={index}>{part.trim()}</div>
        ));
      }
      // Otherwise, render the value as is
      return field.value;
    }
  };

  const excludedTypes = ['image']; // Add the types you want to exclude here
  const typesWithoutDescription = ['heading', 'subheading'];

  

  return (
    <div>
      <Navbar />
      <div className="pdu-project-main-pp">
        <div className="pdu-content-shown-pp">
        <form className="pdu-project-form">
            <div className="pdu-Id-div-pp">
              <input
                type="text"
                className="pdu-project-projectId"
                placeholder="Enter Project ID (Compulsory)"
                value={projectId}
                readOnly // Make the input read-only
              />
            </div>
            <div className="pdu-project-heading">Project Detail</div>
            {projects && projects.length > 0 && (
        <div>
          <div className="pdu-project-subheading">Project ID: {projects[0].projectId}</div>

          <p className="pdu-project-subheading">Email: <p className="pdu-project-description">{projects[0].email}</p></p>
          <p  className="pdu-project-image">
            <img src={projects[0].images} alt="Project Image" />
          </p>
          <br/>
          <h2>Project Content:</h2>
          <div>
          {projects[0].inputFields.filter(field => !excludedTypes.includes(field.type)).map((field, index) => (
              
              <div key={index} >
                {!typesWithoutDescription.includes(field.type) && (
                  <div className="pdu-project-subheading">{field.type}: </div>
                )}
                <div className={`pdu-project-${field.type}`}>{renderFieldValue(field)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
          </form>
        </div>
      </div>

      <div className="pdu-review-section">
        <div className="pdu-heading">
          Project Heading
          {projects && projects.length > 0 && (
          <p className="pd-update-btn">{projects[0].projectDetails.status
}</p>)}
        </div>

        <div className="pdu-section">
          <div className="pdu-user-info">
            <div className="pdu-test">
              <div className="pdu-user-user">
                <div className="pdu-user-name">
                  Owner
                  {projects.length > 0 && profileDetails && (
        <div className="pdu-my-name">
          <img src={profileDetails.imageUrl} alt={profileDetails.name} />
          <div className="pdu-final-name">
             
          <Link
      to={`/userprofile/${profileDetails.userid}`}>
        <p className="pdu-p1">{profileDetails.name}</p>
    </Link>
            <p className="pdu-p2">134 projects - 3 following</p>
          </div>
        </div>
      )}
                </div>
                <div className="pdu-about-proj">
                  <div className="pdu-category">
                    Category
                    <div className="pdu-cat-names">
                      <div className="pdu-badge1">Web Development</div>
                      <div className="pdu-badge2">App Development</div>
                    </div>
                  </div>
                  <div className="pdu-tools-used">
                    Tools Used
                    <p>Figma, React.js, VS Code, NodeJs</p>
                  </div>
                </div>
              </div>
              <button className="pdu-edit-me">Edit Project</button>
            </div>
          </div>

          <div className="pdu-right-review">
            <div className="pdu-right-head">
              <p>Reviews & Feedback</p>
              <button onClick={handleLikeClick}>
                {liked ? "Unlike" : "Like"} {totalLikes}
              </button>
            </div>
            <div className="pdu-right-content">
              <div className="pdu-post-div">
                <input
                  type="text"
                  placeholder="What are your comments on this project?"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="pdu-post-btn" onClick={handleCommentSubmit}>
                  POST
                </button>
              </div>
              <div className="pdu-posted-reviews">
                {comments.map((comment) => (
                  <div className="pdu-one-post" key={comment._id}>
                    <img className="pdu-poster-pic" src={comment.image}></img>

                    <div className="pdu-poster-content">
                      <div className="pdu-div-1">
                      <Link
      to={`/userprofile/${comment.userid}`}>
                        <div className="pdu-d1">{comment.userName}</div>
                        </Link>
                        <div className="pdu-d2">
                          &nbsp;. {comment.createdAt}
                        </div>
                      </div>
                      <div className="pdu-the-comment">{comment.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Review /> */}
    </div>
  );
};

export default Projectuser;