// import React,{useState,useEffect} from 'react'
// import './Frame_10.png'
// import './Open_Queries.css'
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../../header/Navbar';
// import sidearrow from "../../assets/side-arrow.png"

// function Open_Queries() {
//     const location = useLocation();
//     const params = new URLSearchParams(location.search);
//     const receivedData = params.get('id');

//     const [detailQuery,setdetailQuery] = useState([]);    
//     const [comment,setComment] = useState('');
//     const [FullComments,setFullComments] = useState(true);
//     const [detailComment,setdetailComment] = useState([]);

//     useEffect(()=>{
//         // let isMounted = true;
//         // async function fetchDetailQuery() {
//             // console.log(receivedData);
//             axios.get(`http://localhost:8080/api/getdetailquerybyid?id=${receivedData}`).then(
//                 CommunityPosts=>{
//                     // console.log("community Post",CommunityPosts)
//                     setdetailQuery(CommunityPosts.data);
//                 }
//             ).catch(err => console.log(err));
//     },[receivedData])
//     console.log(detailQuery);   
    
//     useEffect(()=>{
//             axios.get(`http://localhost:8080/api/getdetailquerybyid?id=${receivedData}`).then(
//                 CommunityPosts=>{
//                     setdetailComment(CommunityPosts.data.comments);
//                 }
//             ).catch(err => console.log(err));
//             const reverseArr = [...detailComment].reverse()
//             setdetailComment(reverseArr);
//     },[FullComments]) 

//     // console.log("yaha se hua hai",detailComment)

//     const handlePost = async () => {
//         console.log(comment);
//         console.log(receivedData);
//         if(comment){
//             const resp = await axios.post('http://localhost:8080/api/updatePost',{
//                 comment,
//                 pid : receivedData,
//                 commenterEmail : (JSON.parse(localStorage.getItem('msalAccount')))['username'],
//                 commenterName :  (JSON.parse(localStorage.getItem('msalAccount')))['name']
//             })
//             console.log(resp);
//             if(resp.status === 200) {
//                 window.location.reload()
//             }
//             else{ 
//                 console.log("ERROR IN POSTING COMMENT");
//             }
//         }
//         else{ 
//             alert('Empty post message');
//         }
//         setComment('');
//         setFullComments(!FullComments);
//     }
        
//   return (
//     <div>
//         <Navbar/>
//     <div className='Open_Queries'>
//      <div className='Open_Queries_LHS'>
         
//         <div className='Open_Queires_LHS_Top_Left'>
            
//           <div className='Open_Queries_Rectangle'></div>

//           <div className='Open_Queries_LHS_Top_Left_Icons'>

//           </div>

//         </div>



//         <div className='Open_Queires_LHS_Top_right'>
        
//            <div className='Open_Queries_Questions'>

//               <div className='Open_Queries_Main_Question'>
//               {/* Can someone help me find resources on how to use Flutter to create responsive application layouts ? */}
//               {detailQuery.question}
//               </div>

//               <div className='Open_Queries_Post_Time'>
//               Posted by {detailQuery.authorName} on <span className='Open_Queries_Post_Time_Date'>{new Date(detailQuery.createdAt).toLocaleString()}</span>
//               </div>

//            </div>

//            <div className='Open_Queries_Main_Answer'>
//            {/* At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. 

//             Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. 

//             Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
//              */}
//              {detailQuery.description}
//            </div>

//            <div className='Open_Queries_Main_Comments'>
//                <div className='Open_Queries_Comment_Big_box'>
//                 <input className='Open_Queries_Comment_here' placeholder='Add a Comment' value={comment} onChange={(e)=>setComment(e.target.value)}></input>

//                 <div>
//                    <button className='Open_Queries_Comment_Post_button' onClick={handlePost}>Post</button>
//                 </div>

//                </div>
//            </div>

//            <div className='Open_Queries_Actual_Comments'>

//                 {   
//                     detailComment.map(element => 
                        
//                             <div className='Open_Queries_Actual_Sub_Comments'>
//                                 <div className='Open_queries_Sub_Comments_Profile'>
//                                     <div>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
//                                         <circle cx="24" cy="24" r="24" fill="#D9D9D9"/>
//                                     </svg>
//                                     </div>
    
//                                     <div className='Open_Queries_Comments_Content'>
//                                         <div className='Open_Queries_Comments_Content_Name_Time'>
//                                         {element.commenterName} <span className='Open_Queries_dot'>.</span> <span className='Open_Queries_timesinceposted'>{Math.floor((Date.now() - new Date(element.timestamps).getTime()) / (1000 * 60 * 60))} hrs ago</span>
//                                         </div>
//                                         <div className='Open_Queries_Cant_Think_Of_Any_Name'>{element.comment}</div>
//                                     </div>
//                                 </div>
//                             </div>
//                     )
//                 }   
//            </div>

//         </div>

//      </div>



//      <div className='Open_Queries_RHS'>


//          <div className='Open_Queries_RHS_Related'>
//             <img src={sidearrow}></img>
//             <div className='Open_Queries_RHS_Related'>Related</div>
//          </div>

//          <div className='Open_Queries_RHS_Courses'>
//              <div className='Open_Queries_RHS_Black_Text'>
//                 What are the best practices for optimizing app performance across different mobile devices and operating systems?
//              </div>
              
//               <div className="Open_Queries_Posts">
//              <div className='Open_Queries_Posted_By'>Posted by Jatin</div>
//              <div>1st Aug</div>
//              </div>
//          </div>

//          <div className='Open_Queries_RHS_Courses'>
//              <div className='Open_Queries_RHS_Black_Text'>
//                 What are the best practices for optimizing app performance across different mobile devices and operating systems?
//              </div>
              
//               <div className="Open_Queries_Posts">
//              <div className='Open_Queries_Posted_By'>Posted by Jatin</div>
//              <div>1st Aug</div>
//              </div>
//          </div>

//          <div className='Open_Queries_RHS_Courses'>
//              <div className='Open_Queries_RHS_Black_Text'>
//                 What are the best practices for optimizing app performance across different mobile devices and operating systems?
//              </div>
              
//               <div className="Open_Queries_Posts">
//              <div className='Open_Queries_Posted_By'>Posted by Jatin</div>
//              <div>1st Aug</div>
//              </div>
//          </div>


//      </div>

    
//     </div>
//     </div>
//   )
// }

// export default Open_Queries





import React, { useState, useEffect } from 'react';
import './Frame_10.png';
import './Open_Queries.css';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../../header/Navbar';
import sidearrow from "../../assets/side-arrow.png";
import axios from 'axios';


const OpenQueries = () => {
    const location = useLocation();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    const [detailQuery, setDetailQuery] = useState({
        question: '',
        authorName: '',
        createdAt: '',
        description: '',
        authorImage: ''
    });

    const [profiles, setProfiles] = useState([]);
    const storedUserData = localStorage.getItem('user');
    const user = JSON.parse(storedUserData);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        fetchDetailQuery(id);
        fetchProfile(user.uid);
        fetchComments(id);
    }, [id, user.uid]);

    const fetchDetailQuery = async (postId) => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/getdetailquerybyid/${postId}`);
            if (response.status === 200) {
                setDetailQuery(response.data);
            } else {
                console.error('Error fetching detail query:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching detail query:', error.message);
        }
    };

    const fetchProfile = async (userId) => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/profile/${userId}`);
            setProfiles(response.data);
        } catch (error) {
            console.error('Error fetching profile:', error.message);
        }
    };

    const fetchComments = async (queryId) => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/querycomments/${queryId}`);
            setComments(response.data.comments);
        } catch (error) {
            console.error('Error fetching comments:', error.message);
        }
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim()) {
            try {
                const response = await axios.post(`${SERVER_URL}/api/querycomments`, {
                    queryId: id,
                    userName: profiles.name,
                    image: profiles.imageUrl,
                    userid: profiles.userid,
                    content: newComment
                  
                });
                
                if (response.data.status === "success") {
                    setComments([...comments, response.data.comment]);
                    setNewComment("");
                } else {
                    console.error("Failed to post comment:", response.data.message);
                }
            } catch (error) {
                console.error("Error posting comment:", error.message);
            }
        } else {
            alert('Empty post message');
        }
    };


    const [myQueries, setMyQueries] = useState([]);
    useEffect(() => {
        async function fetchMyQueries() {
          try {
           
            const response = await axios.get(`${SERVER_URL}/api/getreatedqueries/${detailQuery.category}`);
            console.log(response);
            
            
            if (response.data.status === 'success' && Array.isArray(response.data.queries)) {
              setMyQueries(response.data.queries);
            } else {
              console.error('Invalid API response:', response.data);
            }
          } catch (error) {
            console.error('Error fetching queries:', error);
            // Set an error state or display an error message to the user
          }
        }
      
        fetchMyQueries();
      
      
      }, [myQueries]);

      const openPost = (id) => {
        console.log("Opening post with ID:", id);
        sessionStorage.setItem('pidVal', id);
        const url = `/detailquery?id=${id}`;
        // Navigate to the constructed URL
        window.location.href = url;
    };

    return (
        <div>
            <Navbar />
            <div className='Open_Queries'>
                <div className='Open_Queries_LHS'>
                    <div className='Open_Queires_LHS_Top_Left'>
                        <div className='Open_Queries_Rectangle'><img src={detailQuery.autherimage} alt="Author" /></div>
                        <div className='Open_Queries_LHS_Top_Left_Icons'></div>
                    </div>
                    <div className='Open_Queires_LHS_Top_right'>
                        <div className='Open_Queries_Questions'>
                            <div className='Open_Queries_Main_Question'>
                                {detailQuery.question}
                            </div>
                            <div className='Open_Queries_Post_Time'>
                                Posted by {detailQuery.authorName} on <span className='Open_Queries_Post_Time_Date'>{new Date(detailQuery.createdAt).toLocaleString()}</span>
                            </div>
                        </div>
                        <div className='Open_Queries_Main_Answer'>
                            {detailQuery.description}
                        </div>
                        <div className='Open_Queries_Main_Comments'>
                            <div className='Open_Queries_Comment_Big_box'>
                                <input className='Open_Queries_Comment_here' placeholder='Add a Comment' value={newComment} onChange={(e) => setNewComment(e.target.value)}></input>
                                <div>
                                    <button className='Open_Queries_Comment_Post_button' onClick={handleCommentSubmit}>Post</button>
                                </div>
                            </div>
                        </div>
                        <div className='Open_Queries_Actual_Comments'>
                            {comments.map(comment => (
                                <div className='Open_Queries_Actual_Sub_Comments' key={comment._id}>
                                    <div className='Open_queries_Sub_Comments_Profile'>
                                        <div className='oq_comment-pic'>
                                            <img src={comment.image} alt="Profile" className='comment-profile-pic' />
                                        </div>
                                        <div className='Open_Queries_Comments_Content'>
                                            <div className='Open_Queries_Comments_Content_Name_Time'>
                                                <Link to={`/userprofile/${comment.userid}`}>
                                                    {comment.userName}
                                                </Link> <span className='Open_Queries_dot'>.</span> <span className='Open_Queries_timesinceposted'>{Math.floor((Date.now() - new Date(comment.createdAt).getTime()) / (1000 * 60 * 60))} hrs ago</span>
                                            </div>
                                            <div className='Open_Queries_Cant_Think_Of_Any_Name'>{comment.content}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='Open_Queries_RHS'>
                    <div className='Open_Queries_RHS_Related'>
                      
                        <div className='Open_Queries_RHS_Related'>Related</div>
                    </div>
                   
                   
                   
                    {myQueries.map(elm => (
              <div className='RHS_Queries-My-Courses-Content-Main' key={elm._id}>
                <div className='RHS_Queries-My-Courses-Content-Text' onClick={() => openPost(elm._id)}>{elm.question}</div>
                <div className='RHS_Queries-My-Courses-Content-Text-Below-Part'>
                  <div className='RHS_Queries-My-Courses-Content-Text-Below-Part-LHS'>
                  <div className='RHS_Queries-My-Courses-Content-Text-Below-Part-Circle-Img'>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    
    <circle cx="12" cy="12" r="12" fill="#D9D9D9" />
   
    <image href={elm.autherimage} x="2" y="2" width="20" height="20" />
  </svg>
</div>

                    <div className='RHS_Queries-My-Courses-Content-Text-Below-Part-Club-Name'>
                      {/* {JSON.parse(localStorage.getItem('msalAccount')).name} */}
                    </div>
                  </div>
                  <div className='RHS_Queries-My-Courses-Content-Text-Below-Part-Date'>
                    {new Date(elm.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
       
   
      


              
            </div>
        </div>
    );
};

export default OpenQueries;
