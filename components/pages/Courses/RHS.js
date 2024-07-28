import React,{useState,useEffect} from 'react'
import './RHS.css'
import axios from 'axios'

function RHS(props) {

  const [ShowCourses,setShowCourses]=useState(true)

  const [ShowMyCourses,setShowMyCourses]=useState(true)

  const AddCourseClicked = () => {
      setShowCourses(!ShowCourses)
  }

  const [myCourses,setMyCourses] = useState([])

  useEffect(() => {
    let isMounted = true;
    async function fetchMyCourses() {
      // const resp = await axios.post('http://localhost:8080/api/myCoursePosts',{userEmail : (JSON.parse(localStorage.getItem('msalAccount')))['username'] });
  
      // if(isMounted){
      //   resp.data.forEach(element => {
      //     setMyCourses(myCourses => [...myCourses,{courseName : element.courseName,timeStamp : element.createdAt }])
      //   });
      // }
      
    }
    fetchMyCourses();
    console.log("FIRE :: ",myCourses);
    return () => {
      isMounted = false;
    };
  },[])  

  return (
    <div className='RHS'>
        <div className='RHS-Biggest-Container'>

          <button className='RHS-Add-Courses'
          onClick={props.ShowOrNotAnswer}
          >
                 <div className='RHS-Add-Courses-Ask-Question'>Add Courses</div>
                 <div className='RHS-Add-Courses-Ask-Question-Add-Button'  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M13.75 16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75V16.25Z" fill="black"/>
                    </svg>
                 </div>
          </button>

          
          {
            ShowMyCourses ? (
              
  
              <div className='RHS-My-Courses'>

             <div className='RHS-My-Courses-Upper-Part'>

                <button className='RHS-Add-Courses-My-Courses-Arrow'>
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="30" viewBox="0 0 14 30" fill="none">
                      <path d="M2 27L12 16L2 6" stroke="#656565"/>
                   </svg>
                </button>

                <div className='RHS-My-Courses-Text'>My Course</div>

                <div className='RHS-My-Courses-Text-View-All'>View All</div>

             </div>

             <div className='RHS-My-Courses-Content'>



                
                
                  {myCourses.map(elm => 
                
                <div className='RHS-My-Courses-Content-Main'>
                      <div className='RHS-My-Courses-Content-Text'>
                          {elm.courseName}
                      </div>
                      <div className='RHS-My-Courses-Content-Text-Below-Part'>
                        <div className='RHS-My-Courses-Content-Text-Below-Part-LHS'>
                        <div className='RHS-My-Courses-Content-Text-Below-Part-Circle-Img'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            < circle cx="12" cy="12" r="12" fill="#D9D9D9"/>
                          </svg>
                        </div>
                        <div className='RHS-My-Courses-Content-Text-Below-Part-Club-Name'>
                          {JSON.parse(localStorage.getItem('msalAccount'))['name']}
                        </div>
                        </div>
                        <div className='RHS-My-Courses-Content-Text-Below-Part-Date'>
                          {new Date(elm.timeStamp).toLocaleString()}
                        </div>
                      </div>
                  </div>
                  )}
             </div>
             
          </div>


            ) : null
          }


        </div>
    </div>
  )
}

export default RHS
