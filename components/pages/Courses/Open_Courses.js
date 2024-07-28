import React from 'react'
import './Open_Courses.css'
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../header/Navbar';

function Open_Courses() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const receivedData = params.get('id');

    const [detailCourse,setdetailCourse] = useState([]);    
    const [comment,setComment] = useState('');
    const [FullComments,setFullComments] = useState(true);
    const [detailComment,setdetailComment] = useState([]);

    useEffect(()=>{
            axios.get(`http://localhost:8080/api/getdetailcoursebyid?id=${receivedData}`).then(
                response => {
                    // console.log("response ye hai", response)
                    setdetailCourse(response.data)
                }
            ).catch(err => console.log(err));
    },[receivedData])
   
    console.log(detailCourse);
    
    useEffect(()=>{
            axios.get(`http://localhost:8080/api/getdetailcoursebyid?id=${receivedData}`).then(
                response => {
                    setdetailComment(response.data.comments)
                }
            ).catch(err => console.log(err));
            const reverseArr = [...detailComment].reverse()
            setdetailComment(reverseArr);
    },[FullComments]) 

    console.log("yaha se hua hai",detailComment)

    const postComment = async () => {
        console.log(comment);
        console.log(receivedData);
        if(comment){
            const resp = await axios.post('http://localhost:8080/api/updateCoursePost',{
                comment,
                pid : receivedData,
                commenterEmail : (JSON.parse(localStorage.getItem('msalAccount'))),
                commenterName :  (JSON.parse(localStorage.getItem('msalAccount')))
            })
            console.log(resp);
            if(resp.status === 200) {
                window.location.reload()
            }
            else{ 
                console.log("ERROR IN POSTING COMMENT");
            }
        }
        else{ 
            alert('Empty post message');
        }
        setComment('');
        setFullComments(!FullComments);
    }
  return (
    <div>
       <Navbar />
    <div className='Open_Courses'>

     
     <div className='Open_Courses_LHS'>
         
        <div className='Open_Courses_LHS_Top_Left'>
            
          <div className='Open_Courses_Rectangle'></div>

          <div className='Open_Courses_LHS_Top_Left_Icons'>

            <div className='Open_Courses_Thumbs_Up'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                 <path d="M5 9V21H1V9H5ZM9 21C8.46957 21 7.96086 20.7893 7.58579 20.4142C7.21071 20.0391 7 19.5304 7 19V9C7 8.45 7.22 7.95 7.59 7.59L14.17 1L15.23 2.06C15.5 2.33 15.67 2.7 15.67 3.11L15.64 3.43L14.69 8H21C21.5304 8 22.0391 8.21071 22.4142 8.58579C22.7893 8.96086 23 9.46957 23 10V12C23 12.26 22.95 12.5 22.86 12.73L19.84 19.78C19.54 20.5 18.83 21 18 21H9ZM9 19H18.03L21 12V10H12.21L13.34 4.68L9 9.03V19Z" fill="#929292"/>
              </svg>

              <div className='Open_Courses_Thumbs_Up_Number'>
               187
              </div>
            </div>

            <div className='Open_Courses_Comments_Views'>

               <div className='Open_Courses_Comments'>

                 <div className='Open_Courses_Comment_Img'>
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                     <path d="M7 14H17C17.2833 14 17.521 13.904 17.713 13.712C17.905 13.52 18.0007 13.2827 18 13C18 12.7167 17.904 12.4793 17.712 12.288C17.52 12.0967 17.2827 12.0007 17 12H7C6.71667 12 6.47933 12.096 6.288 12.288C6.09667 12.48 6.00067 12.7173 6 13C6 13.2833 6.096 13.521 6.288 13.713C6.48 13.905 6.71733 14.0007 7 14ZM7 11H17C17.2833 11 17.521 10.904 17.713 10.712C17.905 10.52 18.0007 10.2827 18 10C18 9.71667 17.904 9.47933 17.712 9.288C17.52 9.09667 17.2827 9.00067 17 9H7C6.71667 9 6.47933 9.096 6.288 9.288C6.09667 9.48 6.00067 9.71733 6 10C6 10.2833 6.096 10.521 6.288 10.713C6.48 10.905 6.71733 11.0007 7 11ZM7 8H17C17.2833 8 17.521 7.904 17.713 7.712C17.905 7.52 18.0007 7.28267 18 7C18 6.71667 17.904 6.47933 17.712 6.288C17.52 6.09667 17.2827 6.00067 17 6H7C6.71667 6 6.47933 6.096 6.288 6.288C6.09667 6.48 6.00067 6.71733 6 7C6 7.28333 6.096 7.521 6.288 7.713C6.48 7.905 6.71733 8.00067 7 8ZM4 18C3.45 18 2.97933 17.8043 2.588 17.413C2.19667 17.0217 2.00067 16.5507 2 16V4C2 3.45 2.196 2.97933 2.588 2.588C2.98 2.19667 3.45067 2.00067 4 2H20C20.55 2 21.021 2.196 21.413 2.588C21.805 2.98 22.0007 3.45067 22 4V19.575C22 20.025 21.796 20.3377 21.388 20.513C20.98 20.6883 20.6173 20.6173 20.3 20.3L18 18H4ZM18.85 16L20 17.125V4H4V16H18.85Z" fill="#929292"/>
                  </svg>
                 </div>

                 <div className='Open_Courses_Comments_Number'>
                       7
                 </div>

               </div>



               <div className='Open_Courses_Views'>
                  
                   <div className='Open_Courses_View_Img'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#929292" stroke-width="2"/>
                      <path d="M20.188 10.934C20.576 11.406 20.77 11.641 20.77 12C20.77 12.359 20.576 12.594 20.188 13.066C18.768 14.79 15.636 18 12 18C8.36398 18 5.23198 14.79 3.81198 13.066C3.42398 12.594 3.22998 12.359 3.22998 12C3.22998 11.641 3.42398 11.406 3.81198 10.934C5.23198 9.21 8.36398 6 12 6C15.636 6 18.768 9.21 20.188 10.934Z" stroke="#929292" stroke-width="2"/>
                    </svg>
                   </div>

                   <div className='Open_Courses_Views_Number'>
                      258
                   </div>

               </div>

            </div>


          </div>

        </div>



        <div className='Open_Courses_LHS_Top_right'>
        
           <div className='Open_Courses_Questions'>

              <div className='Open_Courses_Main_Question'>
              {detailCourse.courseName}
              </div>

              <div className='Open_Courses_Post_Time'>
              Posted by {detailCourse.authorName} on <span className='Open_Queries_Post_Time_Date'>{new Date(detailCourse.createdAt).toLocaleString()}</span>
              </div>
              <div>{detailCourse.category}</div>

           </div>

           <div className='Open_Courses_Main_Answer'>
            {detailCourse.review}
           </div>
            <a href={detailCourse.link}>Link to Course</a>
           <div className='Open_Courses_Main_Comments'>
               <div className='Open_Courses_Comment_Big_box'>
                <input className='Open_Courses_Comment_here' placeholder='Add a Comment'  onChange={(e)=>setComment(e.target.value)} value={comment}></input>

                <div>
                   <button className='Open_Courses_Comment_Post_button' onClick={postComment}>Post</button>
                </div>

               </div>
           </div>

           <div className='Open_Courses_Actual_Comments'>
           {   
                detailComment.map(element => 

                <div className='Open_Courses_Actual_Sub_Comments'>
                    <div className='Open_queries_Sub_Comments_Profile'>
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="24" fill="#D9D9D9"/>
                        </svg>
                        </div>

                        <div className='Open_Courses_Comments_Content'>
                            <div className='Open_Courses_Comments_Content_Name_Time'>
                            {element.commenterName} <span className='Open_Queries_dot'>.</span> <span className='Open_Queries_timesinceposted'>{Math.floor((Date.now() - new Date(element.timestamps).getTime()) / (1000 * 60 * 60))} hrs ago</span>
                            </div>
                            <div className='Open_Courses_Cant_Think_Of_Any_Name'>{element.comment}</div>
                        </div>
                    </div>
                </div>

            )}


                
           </div>

        </div>

     </div>



     <div className='Open_Courses_RHS'>


         <div className='Open_Courses_RHS_Related'>
            {/* <img src='./Frame_10.png'></img> */}
            <div className='Open_Courses_RHS_Related'>Related</div>
         </div>

         <div className='Open_Courses_RHS_Courses'>
             <div className='Open_Courses_RHS_Black_Text'>
                What are the best practices for optimizing app performance across different mobile devices and operating systems?
             </div>
              
              <div className="Open_Courses_Posts">
             <div className='Open_Courses_Posted_By'>Posted by Jatin</div>
             <div>1st Aug</div>
             </div>
         </div>

         <div className='Open_Courses_RHS_Courses'>
             <div className='Open_Courses_RHS_Black_Text'>
                What are the best practices for optimizing app performance across different mobile devices and operating systems?
             </div>
              
              <div className="Open_Courses_Posts">
             <div className='Open_Courses_Posted_By'>Posted by Jatin</div>
             <div>1st Aug</div>
             </div>
         </div>

         <div className='Open_Courses_RHS_Courses'>
             <div className='Open_Courses_RHS_Black_Text'>
                What are the best practices for optimizing app performance across different mobile devices and operating systems?
             </div>
              
              <div className="Open_Courses_Posts">
             <div className='Open_Courses_Posted_By'>Posted by Jatin</div>
             <div>1st Aug</div>
             </div>
         </div>


     </div>

    
    </div>
    </div>
  )
}

export default Open_Courses
