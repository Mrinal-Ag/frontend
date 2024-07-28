





import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to extract parameters

const ProjectDetail = () => {
  const { projectId } = useParams(); // Extract project ID from URL
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [projects, setProjects] = useState([]); // Initialize projects state as an empty array

  useEffect(() => {
    // Fetch project details using project ID
    const fetchProjectDetail = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/Project/${projectId}`);
        console.log(response);
        if (response.data.status === "success") {
          setProjects(response.data.data); // Set projects state to the array of project data
        } else {
          console.error("Failed to fetch project details:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetail();
  }, [projectId]);

  return (
    <div>
      <h1>Project Detail</h1>
      {projects.map((project) => (
        <div key={project.projectId}>
          <h2>Project ID: {project.projectId}</h2>
          <p>Email: {project.email}</p>
          <p className="posted-proj-img">Images: <img src={project.images} alt="Project Image" /></p>

          <h3>Input Fields:</h3>
          <ul>
            {project.inputFields.map((field, index) => (
              <li key={index}>Type: {field.type}, Value: {field.value}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProjectDetail;
