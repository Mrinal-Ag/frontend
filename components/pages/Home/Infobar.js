import React, { useState, useEffect } from "react";
import "./Infobar.css";
import mapIcon from "../../assets/map-icon.png";
import NotFriend from "../../assets/make-friend.png";
import isFriend from "../../assets/is-friend.png";
import AVATAR from "../../assets/Avatar.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

const Infobar = () => {
  const [openSection, setOpenSection] = useState("discover");
  const [profiles, setProfiles] = useState([]);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [followedUsers, setFollowedUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [acceptedNotifications, setAcceptedNotifications] = useState(() => {
    const storedAcceptedNotifications = localStorage.getItem("acceptedNotifications");
    return storedAcceptedNotifications ? JSON.parse(storedAcceptedNotifications) : [];
  });
  const currentUserId = JSON.parse(localStorage.getItem("user")).email;

  useEffect(() => {
    if (openSection === "discover") {
      fetchProfiles();
      fetchFollowedUsers();
    }
  }, [openSection]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/profiles`);
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const fetchFollowedUsers = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/followedUsers/${currentUserId}`);
      setFollowedUsers(response.data.followedUsers);
    } catch (error) {
      console.error("Error fetching followed users:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/notifications/${currentUserId}`);
      setNotifications(response.data);
      console.log(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleFollowToggle = async (profileId, isCurrentlyFollowing) => {
    try {
      if (isCurrentlyFollowing) {
        await axios.delete(`${SERVER_URL}/api/unfollow`, {
          data: { follower_username: currentUserId, following_username: profileId },
        });
        setFollowedUsers(followedUsers.filter((userId) => userId !== profileId));
        alert(`You unfollowed ${profileId}`);
      } else {
        await axios.post(`${SERVER_URL}/api/follow`, {
          follower_username: currentUserId,
          following_username: profileId,
        });
        setFollowedUsers([...followedUsers, profileId]);
        alert(`You started following ${profileId}`);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  const handleAccept = async (notificationId, senderId, senderimg , sendername) => {
    try {
      await axios.post(`${SERVER_URL}/api/accept-collab-request`, {
        notificationId,
        senderId,
        senderimg,
        sendername,
      });
      setAcceptedNotifications([...acceptedNotifications, notificationId]);
      localStorage.setItem("acceptedNotifications", JSON.stringify([...acceptedNotifications, notificationId]));
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleDecline = async (notificationId, senderId, senderimg , sendername) => {
    try {
      await axios.post(`${SERVER_URL}/api/decline-collab-request`, {
        notificationId,
        senderId,
        senderimg,
        sendername,
        
      });
      setAcceptedNotifications([...acceptedNotifications, notificationId]);
      localStorage.setItem("acceptedNotifications", JSON.stringify([...acceptedNotifications, notificationId]));
    } catch (error) {
      console.error('Error declining request:', error);
    }
  };

  const isNotificationAccepted = (notificationId) => {
    return acceptedNotifications.includes(notificationId);
  };

  return (
    <div className="infobar">
      <div className="info-section">
        <button className="accordion" onClick={() => setOpenSection("notification")}>
          Notification
        </button>
        <div className={`panel ${openSection === "notification" ? "open" : "instant-close"}`}>
          {notifications.length === 0 ? (
            <p>No new notifications</p>
          ) : (
            <ul>
              {notifications.map(notification => (
                <li key={notification._id} className='noti-item'>
                  <div className='info-image'>
                    <img className="info-image" src={notification.senderImg}   alt="Avatar" />
                    </div>
                    <div className='info-name'>
                      <div className="info-info" dangerouslySetInnerHTML={{ __html: notification.message }} />
                    </div>
                 
                  {/* Render accept and decline buttons only if message starts with "collab" and not already accepted */}
                  {notification.message.startsWith("Coll") && !isNotificationAccepted(notification._id) && (
                    <div className='noti-butn'>
                      <button className='noti-accept' onClick={() => handleAccept(notification._id, notification.senderId , notification.receiverImg, notification.receiverName)}>Accept</button>
                      <button className='noti-decline' onClick={() => handleDecline(notification._id, notification.senderId, notification.receiverImg ,notification.receiverName)}>Decline</button>
                    </div>
                  )}
                  {/* Render message indicating accepted or declined */}
                  {isNotificationAccepted(notification._id) && (
                    <div className='noti-butn'>
                      <p>Accepted</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="info-section">
        <button className="accordion" onClick={() => setOpenSection("discover")}>
          Discover
        </button>
        {openSection === "discover" &&
          profiles.map((profile) => {
            const isCurrentlyFollowing = followedUsers.includes(profile.userid);
            return (
              <div key={profile._id} className="info-content">
                <img
                  src={profile.imageUrl}
                  className="info-image"
                  alt="User Profile"
                />
                <div className="info-info">
                  <Link to={`/userprofile/${profile.userid}`}>
                    <div>{profile.name}</div>
                  </Link>
                </div>
                <div className="info-select" onClick={() => handleFollowToggle(profile.userid, isCurrentlyFollowing)}>
                  <img
                    src={isCurrentlyFollowing ? isFriend : NotFriend}
                    alt="request friend"
                  />
                </div>
              </div>
            );
          })}
      </div>

      <div className="info-section fixed-bottom">
        {/* Additional info sections */}
      </div>
    </div>
  );
};

export default Infobar;
