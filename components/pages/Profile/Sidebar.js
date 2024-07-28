import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import './Sidebar.css';
import { Avatar } from "flowbite-react";
import Side_arrow from "../../assets/side-arrow.png";
import Graduation_hat from "../../assets/graduation-hat.png";
import School_Pic from "../../assets/school-pic.png";
import diamond from "../../assets/diamond.png";

function Sidebar() {
  const [profiles, setProfiles] = useState([]);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const storedUserData = localStorage.getItem('user');
  const user = JSON.parse(storedUserData);
  const { userid } = useParams(); // Extract userid from URL

  useEffect(() => {
    axios.get(`${SERVER_URL}/api/profile/${userid}`)
      .then(Profile => {
        console.log(Profile);
        setProfiles(Profile.data);
      })
      .catch(err => console.log(err));
  }, [userid]);

  const [activeSection, setActiveSection] = useState("profile");

  const handleSectionToggle = (section) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  const currentUserId = user.email;
  const userId = profiles.email;
  const [notifications, setNotifications] = useState([]);

  const [followedUsers, setFollowedUsers] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/followedUsers/${userId}/${currentUserId}`);
        setFollowedUsers(response.data.followedUsers);
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error('Error fetching followed users:', error);
      }
    };
    fetchFollowedUsers();
  }, [userId, currentUserId]);

  const handleFollow = async () => {
    try {
      await axios.post(`${SERVER_URL}/api/follow`, { follower_username: currentUserId, following_username: userId });
      setIsFollowing(true);
      alert(`You started following ${profiles.name}`);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.delete(`${SERVER_URL}/api/unfollow`, { data: { follower_username: currentUserId, following_username: userId } });
      setIsFollowing(false);
      alert(`You unfollowed ${profiles.name}`);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  
 

  return (
    <div className="app">
      <div className="profile-nav">
        <div className={activeSection === "profile" ? "view-profile-open" : "view-profile-close"}>
          <button className="profile-btn" onClick={() => handleSectionToggle("profile")}>
            <img src={Side_arrow} className="Sidarrow" alt="arrow" />Profile 
          </button>
          {activeSection === "profile" && (
            <div className="profile-details">
              <div className="profile-head">
                <Avatar img={profiles.imageUrl} alt="avatar" rounded />
                <div className="profile-name">
                  <p className="p1">{profiles.name}</p>
                </div>
              </div>
              <div className="profile-origin">
                <div className="profile-know">
                  <p className="p3">Web Development</p>
                  <p className="p4">UI Design</p>
                </div>
                <div className="education">
                  <div><img src={Graduation_hat} alt="graduation hat" /> <p>Web Dev</p></div>
                  <div><img src={School_Pic} alt="school pic" /><p>DSA</p></div>
                </div>
              </div>
              {/* <button className="line"></button> */}
            </div>
          )}
        </div>
        <div className={activeSection === "expertise" ? "view-expertise-open" : "view-expertise-close"}>
          <button className="profile-btn" onClick={() => handleSectionToggle("expertise")}>
            <img src={Side_arrow} className="Sidarrow" alt="arrow" />Expertise
          </button>
          {activeSection === "expertise" && (
            <div className="expertise-details">
              {/* <button className="line"></button> */}
              <div className="data1">
                <div className="Star"><img src={diamond} alt="diamond" />Backend Dev</div>
                <img src={Side_arrow} alt="arrow" />
              </div>
              <div className="data1">
                <div className="Star"><img src={diamond} alt="diamond" />UI Design</div>
                <img src={Side_arrow} alt="arrow" />
              </div>
              <div className="data1">
                <div className="Star"><img src={diamond} alt="diamond" />Frontend Dev</div>
                <img src={Side_arrow} alt="arrow" />
              </div>
              <div className="data1">
                <div className="Star"><img src={diamond} alt="diamond" />DevOps</div>
                <img src={Side_arrow} alt="arrow" />
              </div>
            </div>
          )}
        </div>

        {currentUserId === userId ? (
         
          <Link to={`/EditProfile`} className="follow-btn">
        Edit Profile
      </Link>
      ) : (
        <button className="follow-btn" onClick={isFollowing ? handleUnfollow : handleFollow}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
      </div>

      
    </div>
  );
}

export default Sidebar;
