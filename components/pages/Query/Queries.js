import React,{useState} from 'react'
import Navbar from '../../header/Navbar'
import AskQuery from './AskQuery'
import Top3 from '../Courses/Top3'
import RHS_Queries from './RHS_Queries'
import Queries_Main from './Queries_Main'
import Open_Queries from './Open_Queries'
import './Queries.css'

function Queries() {

  const [ShowPopUp_Queries,setShowPopUp_Queries] = useState(true)

  const [ShowOpenQuery,setShowOpenQuery]= useState(false)

  const PopUp_Queries=() => {
      setShowPopUp_Queries(false)
  }

  const PopUp_Main = () =>{
    setShowPopUp_Queries(true)
  }

  const Post =() =>{
    setShowOpenQuery(!ShowOpenQuery)
  }

  const ShowQuery =()=>{
    setShowOpenQuery(true)
  }

  return (


    <div className='Queries_Done'>
        
        {/* <div className='Queries'> */}
      {/* <AskQuery /> */}
       {/* <Top3 /> */}
       {/* <div className=''> */}
       {/* <RHS_Queries /> */}
       {/* <Queries_Main /> */}
       {/* </div> */}
    {/* </div> */}






       <Navbar />

       {
           ShowOpenQuery ? (
               
            <Open_Queries />

           ):(

            <div className='Edit'>

 
<div className='Queriess'>

{
          ShowPopUp_Queries ? (

            <div className='Queries_Main'>
              <div className='Top3AndAddCourse_Queries'>
             
                 <Queries_Main 
                    Show_Query={ShowQuery}
                 /> 
              </div>

         <div className='RHS_Queries_Main'>
            <RHS_Queries 
               ShowOrNot_Queries={ShowPopUp_Queries}
               ShowOrNotAnswer_Queries={PopUp_Queries}
            />
         </div>
         </div>

          ):(

            <div className='Back_Queries'>
              
              <div className='AskQuery_Queries'>
              <AskQuery
              ShowOrNot_Queries={!ShowPopUp_Queries}
              ShowOrNotAnswer_Queries={PopUp_Queries}
              // Show_Open_Query_Main={Post}
              ShowMain={PopUp_Main}
              />
              </div>

              <div className='RHS_Queries_Main'>
            <RHS_Queries 
               ShowOrNot_Queries={ShowPopUp_Queries}
               ShowOrNotAnswer_Queries={PopUp_Queries}
            />
          </div>


            </div>
          )
        }

        

</div>



            </div>

           )
       }

       
    
    

    
  
    


    </div>

    
  )
}

export default Queries
