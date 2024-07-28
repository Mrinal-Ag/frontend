// ContinueProject.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ContinueProject.css';

const ContinueProject = ({ close, formData, setFormData, handleSubmit }) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  
  const handlePublish = () => {
    handleSubmit && handleSubmit(); // Call the handleSubmit function only if it's defined
    close(); // Close the popup after submitting the form
  };

  return (
    <div className='popup-overlay'>
      <div className="popup">
        <div className='Project_Overlay_Upper_Part'>
          <div className='Project_Overlay_Top2'>
            <div className='Project_Overlay_img'></div>
            <div className='Project_Overlay_img_right'>
              <div className='Project_Overlay_Name'>ProjectName</div>
              <input
                className='Project_Overlay_Project_Name'
                placeholder='Enter Project Name'
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              />
            </div>
          </div>
          <div className='Project_Overlay_Mid_Input'>
            <div className='Project_Overlay_Categories'>
              <div className='Project_Overlay_Category_Name'>Category</div>
              <input
                className='Project_Overlay_Category'
                placeholder='Website Development,UI Design'
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>
            <div className='Project_Overlay_Categories'>
              <div className='Project_Overlay_Category_Name'>Tools</div>
              <input
                className='Project_Overlay_Category'
                placeholder='Website Development,UI Design'
                value={formData.tools}
                onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
              />
            </div>
          </div>
          <div className='Project_Overlay_Project_Status'>
            <div className='Project_Overlay_Project_Status_Name'>Project Status</div>
            <div className='Radio'>
              <label className='Radio_Input'>
                <input
                  type='radio'
                  id="option1"
                  name="options"
                  value="ongoing"
                  checked={formData.status === "ongoing"}
                  onChange={() => setFormData({ ...formData, status: 'ongoing' })}
                />
                <span className='Project_Status_Text'>Ongoing</span>
              </label>
              <label className='Radio_Input' >
                <input
                  type='radio'
                  id="option2"
                  name="options"
                  value="completed"
                  checked={formData.status === "completed"}
                  onChange={() => setFormData({ ...formData, status: 'completed' })}
                />
                <span className='Project_Status_Text'>Completed</span>
              </label>
            </div>
          </div>
          <div className='Project_Overlay_Bottom'>
            <button className='Project_Overlay_Cancel' onClick={close}>Cancel</button>
            {handleSubmit && <button className='Project_Overlay_Publish' onClick={handlePublish}>Publish Project</button>}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueProject;
