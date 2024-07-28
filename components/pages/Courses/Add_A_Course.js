import React,{useState} from 'react'
import RHS from './RHS'
import './Add_A_Course.css'
import img from '../../assets/image-2.png'
import axios from 'axios'

function Add_A_Course(props) {

  const [courseName,setCourseName] = useState('')
  const [category,setCategory] = useState('');
  const [review, setReview] = useState('');
  const [link,setLink] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    const name = e.target.className;
    if(name === 'Add_A_Course-Upper-Part-Write-Course-Name'){
      setCourseName(val);
    }
    else if(name === 'Add_A_Course-Upper-Part-Category'){
      setCategory(val);
    }
    else if(name === 'Add_A_Course-Upper-Part-Review'){
      setReview(val);
    }
    else if(name === 'Add_A_Course-Upper-Part-Link'){
      setLink(val);
    }
  }

  const handleSubmit = async () => {
    const resp = await axios.post('http://localhost:8080/api/addCourse',{
      // authorEmail : (JSON.parse(localStorage.getItem('msalAccount')))['username'],
      authorName : (JSON.parse(localStorage.getItem('msalAccount')))['name'],
      courseName,
      category,
      review,
      link
    });

    console.log(resp);
    if(resp.status === 200) {
      window.location.reload()
    }
  }

  return (

    
    <div className='Add_A_Course'>
      
      {
       props.ShowOrNot? (
        
        <div className='Add_A_Course-Biggest-Container'>

        <div className='Add_A_Course-Upper-Part'>
           <div className='Add_A_Course-Upper-Part-Course-Name'>
               
               <div className='Add_A_Course-Upper-Part-ThumbNail'>
                   <img src={img}>
 
                   </img>
                   Edit ThumbNail Images
               </div>
 
               <div className='Add_A_Course-Upper-Part-Write-Course-Name-text'>
                   <div className='Text-Course-Name'>
                       Course-Name
                   </div>
                   <textarea className='Add_A_Course-Upper-Part-Write-Course-Name' value={courseName} onChange={handleChange}>
                   </textarea>
               </div>
 
           </div>
 
           <div className='Add_A_Course-Upper-Part-Category-text'>
                 <div className='Text-Category'>
                 Category
                 </div>
                  <textarea className='Add_A_Course-Upper-Part-Category' placeholder='Website Development,UI Design' value={category} onChange={handleChange}>
                  </textarea>
           </div>
 
           <div className='Add_A_Course-Upper-Part-Review-text'>
                 <div className='Text-Review'>Review</div>
                  <textarea className='Add_A_Course-Upper-Part-Review' placeholder='Add A Description' value={review} onChange={handleChange}>
                  </textarea>
           </div>
 
           <div className='Add_A_Course-Upper-Part-Link-text'>
                  <div className='Text-Link'>Link</div>
                  <textarea className='Add_A_Course-Upper-Part-Link' placeholder='Add Link to Course' value={link} onChange={handleChange}>
                  </textarea>
           </div>
        </div>
        <div className='Add_A_Course-Lower-Part'>
 
            <button className='Add_A_Course-Lower-Part-Cancel'
              onClick={props.Ha}
            >
               Cancel
            </button>
 
            <button className='Add_A_Course-Lower-Part-Post' onClick={handleSubmit}>
               Post
            </button>
 
        </div>
 
     </div>

       ):null
      }
         

    </div>
  )
}

export default Add_A_Course
