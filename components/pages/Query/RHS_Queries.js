// import React,{useState,useEffect} from 'react'
// import './RHS_Queries.css'
// import axios from 'axios'

// function RHS_Queries(props) {

//   const [ShowCourses_Queries,setShowCourses_Queries]=useState(true)
//   const [ShowMyCourses_Queries,setShowMyCourses_Queries]=useState(true)

//   const AddCourseClicked_Queries = () => {
//       setShowCourses_Queries(!ShowCourses_Queries)
//   }

//   const [myQueries,setMyQueries] = useState([])

//   useEffect(() => {
//     let isMounted = true;
//     async function fetchMyQueries() {
//       const resp = await axios.post('http://localhost:8080/api/myQueryPosts',{userEmail : JSON.parse(localStorage.getItem('msalAccount')) });
//       console.log(resp.data);
//       if(isMounted){
//         resp.data.forEach(element => {
//           setMyQueries(myQueries => [...myQueries,element])
//           console.log(element);
//         });
//       }
      
//     }
//     fetchMyQueries();


//     console.log("FIRE :: ",myQueries);
//     return () => {
//       isMounted = false;
//     };
//   },[])

//   return (
//     <div className='RHS_Queries'>
//         <div className='RHS_Queries-Biggest-Container'>

//           <div className='RHS_Queries-Add-Courses' onClick={props.ShowOrNotAnswer_Queries}>
//                  <div className='RHS_Queries-Add-Courses-Ask-Question'>Ask Question</div>
//                  <button className='RHS_Queries-Add-Courses-Ask-Question-Add-Button'
                   
//                  >
//                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
//                         <path d="M13.75 16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75V16.25Z" fill="black"/>
//                     </svg>
//                  </button>
//           </div>

          
//           {
//             ShowMyCourses_Queries ? (
              
  
//               <div className='RHS_Queries-My-Courses'>

//              <div className='RHS_Queries-My-Courses-Upper-Part'>

//                 <button className='RHS_Queries-Add-Courses-My-Courses-Arrow'>
//                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="30" viewBox="0 0 14 30" fill="none">
//                       <path d="M2 27L12 16L2 6" stroke="#656565"/>
//                    </svg>
//                 </button>

//                 <div className='RHS_Queries-My-Courses-Text'>My Queries</div>

//                 <div className='RHS_Queries-My-Courses-Text-View-All'>View All</div>

//              </div>

//              <div className='RHS_Queries-My-Courses-Content'>

//              {myQueries.map(elm => 
//                 <div className='RHS_Queries-My-Courses-Content-Main'>  
//                 <div className='RHS_Queries-My-Courses-Content-Text'>  {elm.question} </div>  
//                 <div className='RHS_Queries-My-Courses-Content-Text-Below-Part'>    
//                 <div className='RHS_Queries-My-Courses-Content-Text-Below-Part-LHS'>    
//                 <div className='RHS_Queries-My-Courses-Content-Text-Below-Part-Circle-Img'>       
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> < circle cx="12" cy="12" r="12" fill="#D9D9D9"/> </svg> 
//                 </div> 
//                 <div className='RHS_Queries-My-Courses-Content-Text-Below-Part-Club-Name'>  {JSON.parse(localStorage.getItem('msalAccount'))['name']} </div> 
//                 </div>    
//                 <div className='RHS_Queries-My-Courses-Content-Text-Below-Part-Date'> {new Date(elm.createdAt).toLocaleString()} </div> </div></div>
//               )}

//              </div>
             
//           </div>


//             ) : null
//           }


//         </div>
//     </div>
//   )
// }

// export default RHS_Queries

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RHS_Queries.css';

function RHS_Queries(props) {
  const [ShowMyCourses_Queries, setShowMyCourses_Queries] = useState(true);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [myQueries, setMyQueries] = useState([]);
  useEffect(() => {
    async function fetchMyQueries() {
      try {
        const storedUserData = localStorage.getItem('user');
        if (!storedUserData) {
          console.error('User data not found in localStorage');
          return;
        }
        const user = JSON.parse(storedUserData);
        const response = await axios.get(`${SERVER_URL}/api/getqueries/${user.email}`);
        
        // Check if the response status is 'success' and if it contains the 'queries' array
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
  
    return () => {
      // Cleanup
    };
  }, []);


  const openPost = (id) => {
    console.log("Opening post with ID:", id);
    sessionStorage.setItem('pidVal', id);
    const url = `/detailquery?id=${id}`;
    // Navigate to the constructed URL
    window.location.href = url;
};
  
  return (
    <div className='RHS_Queries'>
    <div className='RHS_Queries-Biggest-Container'>
      <div className='RHS_Queries-Add-Courses' onClick={props.ShowOrNotAnswer_Queries}>
        <div className='RHS_Queries-Add-Courses-Ask-Question'>Ask Question</div>
        <button className='RHS_Queries-Add-Courses-Ask-Question-Add-Button'>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M13.75 16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75V16.25Z" fill="black" />
          </svg>
        </button>
      </div>
  
      {ShowMyCourses_Queries ? (
        <div className='RHS_Queries-My-Courses'>
          <div className='RHS_Queries-My-Courses-Upper-Part'>
            <button className='RHS_Queries-Add-Courses-My-Courses-Arrow'>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="30" viewBox="0 0 14 30" fill="none">
                <path d="M2 27L12 16L2 6" stroke="#656565" />
              </svg>
            </button>
            <div className='RHS_Queries-My-Courses-Text'>My Queries</div>
            <div className='RHS_Queries-My-Courses-Text-View-All'>View All</div>
          </div>
  
          <div className='RHS_Queries-My-Courses-Content'>
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
      ) : null}
    </div>
  </div>
  
  );
}

export default RHS_Queries;
