import React, { useEffect, useState } from "react";
import "./AddCourses.css";
import axios from "axios";
import course_img from "../../assets/course_img.jpg";

function AddCourse(props) {
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function fetchAllCoursesByLatest() {
      const resp = await axios.get(
        "http://localhost:8080/api/sortCoursePostsByLatest"
      );
      if (isMounted) {
        resp.data.forEach((resp) => {
          setAllCourses((prevResp) => [...prevResp, resp]);
        });
        console.log(allCourses);
      }
    }
    fetchAllCoursesByLatest();
    console.log(allCourses);
    return () => {
      isMounted = false;
    };
  }, []);

  const openCourse = (e) => {
    const pid = e.target.id.substring(1);
    console.log("HELOOOOO");
    console.log(pid);
    // sessionStorage.setItem('pidVal',pid);
    const url = `/detailcourse?id=${pid}`;
    // Navigate to the constructed URL
    window.location.href = url;
  };

  return (
    <div className="AddCourses">
      <div className="Top3-biggest-box">
        {allCourses.map((elm) => (
          <div className="Top3-box" id={`A${elm._id}`} onClick={openCourse}>
            <div className="Top3-greybox" id={`B${elm._id}`}>
              <img
                src={course_img}
                alt=""
                style={{ height: "100%", width: "100%", borderRadius: "14px" }}
              />
            </div>
            <div className="Top3-sideinfo" id={`C${elm._id}`}>
              <div id={`D${elm._id}`}>{elm.courseName}</div>
              <div className="Top3-clubsss" id={`E${elm._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle cx="12" cy="12" r="12" fill="#D9D9D9" />
                </svg>
                <div
                  className="Top3-club"
                  id={`F${elm._id}`}
                  style={{ marginLeft: "0.4vw", marginTop: "0.4vh" }}
                >
                  {elm.authorName}
                </div>
              </div>
              <div className="Top3-skills" id={`G${elm._id}`}>
                <div className="Top3-new1" id={`H${elm._id}`}>
                  Web devolopment
                </div>
                <div className="Top3-new2" id={`I${elm._id}`}>
                  UI/UX
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddCourse;
