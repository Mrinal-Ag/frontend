import React from 'react';
import axios from 'axios';
import "./Notification.css";
import mapicon from "../../assets/map-icon.png";
import AVATAR from "../../assets/Avatar.jpg";

function Notification(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const handleAccept = async () => {
    try {
      // Send a request to accept collaboration
      await axios.post(`${SERVER_URL}/api/notification/${props.notificationId}/accept`);
      // Optionally, you can update the UI after accepting the collaboration
    } catch (error) {
      console.error('Error accepting collaboration:', error);
    }
  };

  const handleDecline = async () => {
    try {
      // Send a request to decline collaboration
      await axios.post(`${SERVER_URL}/api/notification/${props.notificationId}/decline`);
      // Optionally, you can update the UI after declining the collaboration
    } catch (error) {
      console.error('Error declining collaboration:', error);
    }
  };

  return (
    <div className='noti-boss'>
      <div className='noti-name'>
        <div className='noti-noti'>
          <img src={AVATAR} alt="Avatar"></img>
          <div className='noti-info'>
            {props.senderName}
            <div className='noti-loc'>
              <img src={mapicon} alt="Map Icon"></img>
              <p>{props.location}</p>
            </div>
          </div>
        </div>
        <div className='noti-div1'>Would like to collaborate with you on your project </div>
        <div className='noti-div2'>{props.projectName}</div>
      </div>
      <div className='noti-butn'>
        <div className='noti-accept' onClick={handleAccept}>Accept</div>
        <div className='noti-decline' onClick={handleDecline}>Decline</div>
      </div>
    </div>
  );
}

export default Notification;
