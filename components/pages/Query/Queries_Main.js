// import React,{useState,useEffect} from 'react'
// import './Queries_Main.css'
// import axios from 'axios';


// function Queries_Main(props) {
//     const [allQueries,setAllQueries] = useState([]);    

//     useEffect(()=>{
//         let isMounted = true;
//         async function fetchAllQueriesByLatest() {
//             const resp = await axios.get('http://localhost:8080/api/sortQueryPostsByLatest');
//             if(isMounted){
//                 resp.data.forEach(resp => {
//                     setAllQueries(prevResp => [...prevResp,resp])
//                 })       
//             }
//         }
//         fetchAllQueriesByLatest();
//         console.log(allQueries);
//         return () => {
//             isMounted = false;
//         }
//     },[])

//     const openPost = (e) => {
        
//         const pid = (e.target.id).substring(1);
//         console.log("HELOOOOO");
//         console.log(pid);
//         sessionStorage.setItem('pidVal',pid);
//         const url = `/detailquery?id=${pid}`;
//         // Navigate to the constructed URL
//         window.location.href=url;
//     }

//     return (
//     <div className='Queries_Main'>


//         <div class="section-container">
//             <div class="comment-section">
                
                
//                 {
//                     allQueries.map(elm => 
                        
//                         <div class="individual-comment" id={`U${elm._id}`} onClick={openPost}>
//                         <div className='Queries_Main-Text_with_Skills' id={`I${elm._id}`}>
//                              <p className='Queries_Main-RHS-Text-Main' id={`J${elm._id}`}> {elm.question} </p>
//                              <div class="skill-section" id={`K${elm._id}`}>
//                                 <div class="webd-tag">Web Development</div> <div class="uidesign-tag">UI Design</div>
//                             </div>
//                         </div>
//                         <div class="interaction-section" id={`L${elm._id}`}>
//                             {/* <div class = "likes-interacted" id={`M${elm._id}`}>187</div>
//                             <div class="comments-interacted" id={`N${elm._id}`}> 7 258 </div> */}
//                             <div class="posted-when" id={`O${elm._id}`}> Posted by {elm.authorName} {Math.floor((Date.now() - new Date(elm.createdAt).getTime()) / (1000 * 60 * 60))} hrs ago </div>
//                         </div>
//                     </div>
                        
//                         )
//                 }

                
                

//             </div>

//         </div>


//     </div>
//   )
// }

// export default Queries_Main


import React, { useState, useEffect } from 'react';
import './Queries_Main.css';
import axios from 'axios';
import Top3 from '../Courses/Top3';

function Queries_Main(props) {
    const [allQueries, setAllQueries] = useState([]);
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const [filteredQueries, setFilteredQueries] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);

    const storedUserData = localStorage.getItem('user');
  const user = JSON.parse(storedUserData);

    useEffect(() => {
        // Fetch all posts from the API
        axios.get(`${SERVER_URL}/api/posts`)
            .then(response => {
                setAllQueries(response.data);
                setFilteredQueries(response.data); // Initially show all queries
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });

        // Fetch the list of users that the current user is following
        axios.get(`${SERVER_URL}/api/following/${user.email}`)
        .then(response => {
            setFollowingUsers(response.data);
            console.log(followingUsers);
        })
        .catch(error => {
            console.error('Error fetching following users:', error);
        });
}, [props.currentUserEmail]);

    const openPost = (id) => {
        console.log("Opening post with ID:", id);
        sessionStorage.setItem('pidVal', id);
        const url = `/detailquery?id=${id}`;
        window.location.href = url;
    };

    const [isopen1, setisopen1] = useState(true);
    const [isopen2, setisopen2] = useState(false);
    const [isopen3, setisopen3] = useState(false);

    const clicked1 = (section) => {
        setisopen1(section);
        setisopen2(false);
        setisopen3(false);
        setFilteredQueries(allQueries); // Show all queries
    };

    const clicked2 = (section) => {
        setisopen2(section);
        setisopen1(false);
        setisopen3(false);
        // Show latest 5 queries
        setFilteredQueries(allQueries.slice(0, 5));
    };

    const clicked3 = () => {
        setisopen3(true);
        setisopen2(false);
        setisopen1(false);
        // Filter queries from followed users
        const filtered = allQueries.filter(query => 
            followingUsers.includes(query.authorEmail)
        );
        setFilteredQueries(filtered);
    };

    return (
        <div className='Queries_Main'>
        <div className='query'>
            <div className="Top3">
                <div className="Top3-biggest-container">
                    <div className="container-1">
                        <nav className='Upper_part'>
                            <a href="#" className='gugu item-container-1'>
                                <div
                                    className={`${
                                        isopen1 === true ? "yesopen" : "notopen"
                                    }`}
                                    onClick={() => clicked1(true)}
                                >All</div>
                            </a>
                            <a href="#" className='gugu item-container-1'>
                                <div
                                    className={`${
                                        isopen2 === true ? "yesopen" : "notopen"
                                    }`}
                                    onClick={() => clicked2(true)}
                                >Latest</div>
                            </a>
                            <a href="#" className='gugu item-container-1'>
                                <div
                                    className={`${
                                        isopen3 === true ? "yesopen" : "notopen"
                                    }`}
                                    onClick={() => clicked3(true)}
                                >Following</div>
                            </a>
                            <div className="animation start-home"></div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="section-container">
                <div className="comment-section">
                    {
                        filteredQueries.map(elm =>
                            <div className="individual-comment" id={`U${elm._id}`} onClick={() => openPost(elm._id)} key={elm._id}>
                                <div className='Queries_Main-Text_with_Skills' id={`I${elm._id}`}>
                                    <p className='Queries_Main-RHS-Text-Main' id={`J${elm._id}`}> {elm.question} </p>
                                    <div className="skill-section" id={`K${elm._id}`}>
                                        <div className="webd-tag"> {elm.category}</div> 
                                    </div>
                                </div>
                                <div className="interaction-section" id={`L${elm._id}`}>
                                    <div className="posted-when" id={`O${elm._id}`}>
                                        Posted by {elm.authorName} {Math.floor((Date.now() - new Date(elm.createdAt).getTime()) / (1000 * 60 * 60))} hrs ago
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                </div>
            </div>
        </div>
    );
}

export default Queries_Main;
