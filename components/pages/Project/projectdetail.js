import React, { useState, useEffect } from "react";
import Navbar from "../../header/Navbar";
// import "./PostedProject.css";
// import "./Review.css";
import "./projectdetail.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to extract parameters
import Review from "./Review";
import thumbsUp from "../../assets/thumbs-up.png";

const Project = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { projectId } = useParams(); // Extract project ID from URL
  const [projects, setProjects] = useState([]); // Initialize projects state as an empty array
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [profiles, setProfiles] = useState([]);
  const storedUserData = localStorage.getItem("user"); // Retrieve the stored user data

  const [profileDetails, setProfileDetails] = useState(null);

  const user = JSON.parse(storedUserData); // Parse the stored user data from JSON to JavaScript object
  console.log(user.uid);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/profile/${user.uid}`)
      .then((Profile) => {
      
        setProfiles(Profile.data);

        console.log(profiles);
       
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
         
          console.log(projects);
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
  
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/projectslike/status/${projectId}/${user.uid}`);
        if (response.status === 200) {
          setLiked(response.data.liked);
          setTotalLikes(response.data.totalLikes);
        } else {
          console.error("Failed to fetch like status");
        }
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };
  
    fetchLikeStatus();
  }, [projectId, user.uid]);
  
  const handleLikeClick = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/projectslike/${projectId}/${user.uid}/like`);
      if (response.status === 200) {
        const responseData = response.data;
        setLiked(responseData.liked);
        setTotalLikes(responseData.totalLikes);
      } else {
        console.error("Failed to update like status");
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };
  
  
  
  //LIKES END



  

  //Collaboration
  const [text, setText] = useState("");
  const [receiverId, setReceiverId] = useState("");

  const handleCollaboration = async () => {
    try {
      const senderId = profiles.email; // Assuming profiles contains sender information
      const senderName = profiles.name; // Assuming profiles contains sender information

      let projectName = ""; // Initialize projectName
      let projectactname = ""; // Initialize projectName
       let projectid = "";
      // Check if projects array is not empty and projects[0].name is defined
      if (projects.length > 0 && projects[0].name) {
        projectName = projects[0].name; // Assign projectName if conditions are met
        projectactname = projects[0].projectDetails.projectName;
        projectid = projects[0].projectId;
      } else {
        console.error("Project name is not available.");
        return; // Exit the function if project name is not available
      }

      const messageText = `Message from ${senderName} to collab on  ${projectactname}: ${text}`;

      const requestBody = {
        text: messageText,
        senderuserid: user.uid,
        receiveruserid: profileDetails.userid,
        senderId: senderId, // Use actual senderId
        senderName: user.displayName,
        receiverName: profileDetails.name,
        senderImg: profiles.imageUrl,
        receiverImg: profileDetails.imageUrl,
        projectName: projectactname,
        projectid : projectid,
        receiverId: projects[0].email, // Use actual receiverId from state
        
      };

      console.log(requestBody);

      // Send POST request to the server
      await axios.post(`${SERVER_URL}/api/send-collab-request`, requestBody);
      alert("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    }
  };

  
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

  // const headingField = projects[0].inputFields.find(field => field.type === 'heading');


  return (
    <div>
      <Navbar />
      <div className="pd-project-main-pp">
        <div className="pd-content-shown-pp">
          <form className="pd-project-form">
            {/* <div className="pd-Id-div-pp">
              <input
                type="text"
                className="pd-project-projectId"
                placeholder="Enter Project ID (Compulsory)"
                value={projectId}
                readOnly // Make the input read-only
              />
            </div> */}
            <div className="pd-project-heading">Project Detail</div>
            {projects && projects.length > 0 && (
        <div>
          <div className="pd-project-subheading">Project ID: {projects[0].projectId}</div>

          {/* <p className="pd-project-subheading">Email: <p className="pdu-project-description">{projects[0].email}</p></p> */}
          <p className="pd-project-image">
            <img src={projects[0].images} alt="Project Image" />
          </p>
          <br/>
          <h2>Project Content:</h2>
          <div>
            {projects[0].inputFields.filter(field => !excludedTypes.includes(field.type)).map((field, index) => (
              
              <div key={index} >
                {!typesWithoutDescription.includes(field.type) && (
                  <div className="pd-project-subheading">{field.type}: </div>
                )}
                <div className={`pd-project-${field.type}`}>{renderFieldValue(field)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
          </form>
        </div>
      </div>

      <div className="pd-review-section">
        <div className="pd-heading">
          Project Heading
          {projects && projects.length > 0 && (
          <p className="pd-update-btn">{projects[0].projectDetails.status
}</p>
          )}
        </div>

        <div className="pd-section">
          <div className="pd-user-info">
            <div className="pd-test">
              <div className="pd-user-user">
                <div className="pd-user-name">
                  Owner
                  {projects.length > 0 && profileDetails && (
        <div className="pd-my-name">
          <img src={profileDetails.imageUrl} alt={profileDetails.name} />
          <div className="pd-final-name">
          
          <Link
      to={`/userprofile/${profileDetails.userid}`}>
        <p className="pd-p1">{profileDetails.name}</p>
    </Link>
            <p className="pd-p2">134 projects - 3 following</p>
          </div>
        </div>
      )}
                </div>
                <div className="pd-about-proj">
                  <div className="pd-category">
                    Category
                    <div className="pd-cat-names">
                      <div className="pd-badge1">Web Development</div>
                     
                    </div>
                  </div>
                  <div className="pd-tools-used">
                    Tools Used
                    <p>Figma, React.js, VS Code, NodeJs</p>
                  </div>
                </div>
              </div>
              {/* <button className="pd-edit-me">Edit Project</button> */}
              <button className="pd-edit-me" onClick={handleCollaboration}>Collaborate</button>

            </div>
          </div>

          <div className="pd-right-review">
            {/* <div className="pd-right-review"> */}
            <div className="pd-right-head">
              <p>Reviews & Feedback</p>
              <button onClick={handleLikeClick}>
        {liked ? "Unlike" : "Like"} {totalLikes}
      </button>
            </div>
            {/* </div> */}

            {/* <button onClick={() => handleCollaborationRequest(projectId)}>Request Collaboration</button> */}
            <div className="pd-right-content">
              <div className="pd-post-div">
                <input
                  type="text"
                  placeholder="What are your comments on this project?"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="pd-post-btn" onClick={handleCommentSubmit}>
                  POST
                </button>
              </div>
              <div className="pd-posted-reviews">
                {comments.map((comment) => (
                  <div className="pd-one-post" key={comment._id}>
                    <img className="pd-poster-pic" src={comment.image}></img>

                    <div className="pd-poster-content">
                      <div className="pd-div-1">
                      <Link
      to={`/userprofile/${comment.userid}`}>
                        <div className="pd-d1">{comment.userName}</div>
                        </Link>
                        <div className="pd-d2">&nbsp;. {comment.createdAt}</div>
                      </div>
                      <div className="pd-the-comment">{comment.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;