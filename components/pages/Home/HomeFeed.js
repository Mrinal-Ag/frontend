import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './HomeFeed.css';
import Infobar from "./Infobar";
import axios from "axios";

 
  
const HomeFeed = (props) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const storedUserData = localStorage.getItem('user');
  const user = JSON.parse(storedUserData);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  

  useEffect(() => {
    // Fetch project data from the backend when the component mounts
    fetchProjects();
    fetchFollowingUsers();
  }, []);

  const fetchProjects = async () => {
    try {
      // Make a GET request to fetch projects from the backend API
      const response = await axios.get(`${SERVER_URL}/api/fetchProject`);
      if (response.data.status === "success") {
        // Set the projects state with the fetched project data
        setProjects(response.data.data);
        setFilteredProjects(response.data.data); // Initially show all projects
      } else {
        console.error("Failed to fetch projects:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchFollowingUsers = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/following/${user.email}`);
      setFollowingUsers(response.data);
    
    } catch (error) {
      console.error('Error fetching following users:', error);
    }
  };

  const [isopen1, setisopen1] = useState(true);
  const [isopen2, setisopen2] = useState(false);
  const [isopen3, setisopen3] = useState(false);

  const clicked1 = () => {
    setisopen1(true);
    setisopen2(false);
    setisopen3(false);
    setFilteredProjects(projects); // Show all projects
  };

  const clicked2 = () => {
    setisopen2(true);
    setisopen1(false);
    setisopen3(false);
    setFilteredProjects(projects.slice(0, 5)); // Show latest 10 projects
  };

  const clicked3 = () => {
    setisopen3(true);
    setisopen2(false);
    setisopen1(false);
    // Filter projects from followed users
    const filtered = projects.filter(project =>
      followingUsers.includes(project.email)
    );
    setFilteredProjects(filtered);
  };



  

  return (
    <div className="HomeFeed">
    <div className="projects">


    
      <div className="Top3">
        <div className="Top3-biggest-container">
          <div className="container-1">
            <nav className='Upper_part'>
              <a href="#" className='gugu item-container-1'>
                <div
                  className={`${isopen1 === true ? "yesopen" : "notopen"}`}
                  onClick={clicked1}
                >All</div>
              </a>
              <a href="#" className='gugu item-container-1'>
                <div
                  className={`${isopen2 === true ? "yesopen" : "notopen"}`}
                  onClick={clicked2}
                >Latest</div>
              </a>
              <a href="#" className='gugu item-container-1'>
                <div
                  className={`${isopen3 === true ? "yesopen" : "notopen"}`}
                  onClick={clicked3}
                >Following</div>
              </a>
              <div className="animation start-home"></div>
            </nav>
          </div>
        </div>
      </div>
      <div className="biggest-container">
        <div className="biggest-box">
          {filteredProjects && filteredProjects.length > 0 ? (
            // Render project boxes if projects array is not empty
            filteredProjects.map((project) => (


            

  <Link 
  to={ `/project/${project.projectId}`} 
  key={project.projectId} 
  className="project-box" 
  >
                <img
                  src={project.images} 
                  alt="Project"
                  className="project-image"
                  style={{  }}
                />
                <div className="project-details">
                  <h3>{project.projectId}</h3>
                  {project.inputFields && project.inputFields.map((field, index) => (
                    field.type === 'heading' && <p key={index}>{field.value}</p>
                  ))}
                </div>
              </Link>
            ))
          ) : (
            // Render loading message or error message if projects array is empty or undefined
            <p>{filteredProjects ? "No projects found" : "Loading..."}</p>
          )}
        </div>
      </div>
      </div>
      <Infobar />
    </div>
  );
};

export default HomeFeed;
