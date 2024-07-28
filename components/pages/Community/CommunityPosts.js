import React from 'react'
import { useState } from 'react';
import axios from 'axios';
function CommunityPosts() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const [ques,setQues] = useState('');
    const [desc,setDesc] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(localStorage.getItem('msalAccount')){
        const username = JSON.parse(localStorage.getItem('msalAccount'))['name'];
        const useremail = JSON.parse(localStorage.getItem('msalAccount'))['username'];
        console.log(useremail,username);
        axios.post(`${SERVER_URL}/api/postQuestion`, {
        ques,
        desc,
        username,
        useremail
    }).then((res) => {
        console.log(res);
        console.log("post req success");
    })
    .catch((err) => {
        console.log(err);
    })
    }
    
  }

  const handleChange = (e) => {
    const tag = e.target.name;
    const value = e.target.value;
    if(tag == "question") {
        setQues(value);
    }
    else setDesc(value);
  }

  return (
    <div>
        <form >
            <input type="text" name="question" id="ques" value={ques} onChange={handleChange}/>
            <input type="text" name="description" id="desc" value={desc} onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
        </form>
    </div>
  )
}

export default CommunityPosts;