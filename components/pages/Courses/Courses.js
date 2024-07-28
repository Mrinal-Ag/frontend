import React,{useState} from 'react'
import Top3 from './Top3'
import AddCourse from './AddCourses'
import RHS from './RHS'
import Navbar from '../../header/Navbar'
import './Courses.css'
import Add_A_Course from './Add_A_Course'
// import './image-2.png'
import Open_Courses from './Open_Courses'

function Courses() {

  const [ShowPopUp,setShowPopUp] = useState(true)
  const [ShowOpenCourses,setShowOpenCourses]=useState(false)

  const PopUp=() => {
      setShowPopUp(false)
  }

  const PopUpI=()=>{
    setShowPopUp(true)
  }

  const OpenCourses=()=>{
       setShowOpenCourses(true)
  }

  return (
    <div>
        <Navbar/>


        {
          ShowOpenCourses?(
                       <Open_Courses /> 
          ):(


            <div className='Coursess'>

           

            {
              ShowPopUp ? (

                <div className='Courses_Main'>
                <div className='Top3AndAddCourse'>
                <Top3 />
                <AddCourse 
                   Haha={OpenCourses}
                /> 
             </div>

             <div className='RHS_Main'>
                <RHS 
                   ShowOrNot={ShowPopUp}
                   ShowOrNotAnswer={PopUp}
                />
             </div>
             </div>

              ):(

                <div className='Newww'>

              

                  <Add_A_Course 
                  ShowOrNot={!ShowPopUp}
                  ShowOrNotAnswer={PopUp}
                  Ha={PopUpI}
                  />

                  <div className='RHS_Main'>
                    <RHS 
                   ShowOrNot={ShowPopUp}
                   ShowOrNotAnswer={PopUp}
                    />
                  </div>
                </div>

                
              )
            }

              

          
            
        </div>


          )
        }


    </div>
  )
}

export default Courses;