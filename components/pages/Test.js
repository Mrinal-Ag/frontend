import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Test() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const receivedData = params.get('id');
  const [project, setProject] = useState([]);

  useEffect(() => {
    axios.get(`${SERVER_URL}/api/addProject/?projectId=${receivedData}`)
      .then(Project => {
        setProject(Project.data);
      })
      .catch(error => console.error('Error fetching project details:', error));
  }, []);

  return (
    <div>
      <h2>Project Details</h2>
      {project.map(projectItem => (
        <div key={projectItem.projectId}>
          <strong>Project ID:</strong> {projectItem.projectId}
          <br />
          <strong>Image:</strong> <img src={projectItem.image} alt="Project" />
          <br />
          <strong>Input Fields:</strong>
          <ul>
            {projectItem.inputFields.map((field, index) => (
              <li key={index}>
                {field.type === 'heading' && (
                  <>
                    <strong>Heading:</strong> {field.value}
                    <br />
                  </>
                )}
                {field.type === 'subheading' && (
                  <>
                    <strong>Subheading:</strong> {field.value}
                    <br />
                  </>
                )}
              </li>
            ))}
          </ul>
          {/* Add more project details here */}
        </div>
      ))}
    </div>
  );
}

export default Test;