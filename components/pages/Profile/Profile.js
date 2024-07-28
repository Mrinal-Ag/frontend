import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Sidebar from "./Sidebar";
import axios from "axios";
import Navbar from "../../header/Navbar";
import { useParams } from "react-router-dom";

const Profile = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [selectedStatus, setSelectedStatus] = useState("completed"); // Initialize selectedStatus with "ongoing"
  const [projects, setProjects] = useState([]);
  const storedUserData = localStorage.getItem("user");
  const user = JSON.parse(storedUserData);
  
  const [profiles, setProfiles] = useState([]);
  const { userid } = useParams(); // Extract userid from URL
  
  // Define fetchProjectDetails function before using it in useEffect hooks
  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/fetchProject/${profiles.email}?status=${selectedStatus}`
      );
      if (response.ok) {
        const data = await response.json();
        setProjects(data.data);
      } else {
        throw new Error("Failed to fetch project details");
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };
  
  useEffect(() => {
    // Fetch user profile data when the component mounts
    axios
      .get(`${SERVER_URL}/api/profile/${userid}`)
      .then((Profile) => {
        console.log(Profile);
        setProfiles(Profile.data);
      })
      .catch((err) => console.log(err));
  }, [userid]); // Make sure to include userid as a dependency
  
  useEffect(() => {
    // Fetch project details based on the default selected status when the component mounts
    fetchProjectDetails();
  }, [userid, selectedStatus, profiles.email]); // Refetch projects when userid, selectedStatus, or profiles.email changes
  
  const handleStatusClick = (status) => {
    setSelectedStatus(status); // Update selectedStatus when the status button is clicked
  };
  

  return (
    <div>
      <Navbar />
      <div className="Profile">
        <Sidebar />
        <div className="prof-homer">
          <div className="profile_nav">
            <div className="profile_pjt_view">Project Overview</div>
            <div className="profile_btn">
              <div
                className={
                  selectedStatus === "ongoing"
                    ? "activeStatus profile_ongoing_btn"
                    : "profile_ongoing_btn"
                }
                onClick={() => handleStatusClick("ongoing")}
              >
                Ongoing
              </div>
              <div
                className={
                  selectedStatus === "completed"
                    ? "activeStatus profile_complete_btn"
                    : "profile_complete_btn"
                }
                onClick={() => handleStatusClick("completed")}
              >
                Completed
              </div>
            </div>
          </div>

          <div className="show-project">
            <div className="projects">
              {projects.map((project) => (
                <Link
                  to={`/profile/${encodeURIComponent(project.projectId)}`}
                  key={project.projectId}
                  className="project-box"
                >
                  <div className="project-box">
                    <img
                      src={project.images}
                      alt="Project"
                      className="project-image"
                      style={{ }}
                    />
                    <div className="project-details">
                      <h3>{project.projectId}</h3>
                      {project.inputFields.map((field, index) => {
                        if (field.type === "heading") {
                          return <p key={index}>{field.value}</p>;
                        }
                        return null; // Return null if the field type is not 'heading'
                      })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
