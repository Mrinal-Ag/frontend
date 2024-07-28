import React, { useState , useEffect} from 'react';
import './AskQuery.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function AskQuery(props) {
    const [ques, setQues] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const[profiles,setProfiles]=useState([]);
    const storedUserData = localStorage.getItem('user');
    const user = JSON.parse(storedUserData);


    

   
    

  useEffect(() => {
    axios.get(`${SERVER_URL}/api/profile/${user.uid}`)
      .then(Profile => {

        console.log(Profile);
        setProfiles(Profile.data);
      })
      .catch(err => console.log(err));
  }, []);
  




    const handleSubmit = async () => {
        if (user) {
            if (ques && desc && category) {
                try {
                    const res = await axios.post(`${SERVER_URL}/api/addPost`, {
                        authorEmail: profiles.email,
                        authorName: profiles.name,
                        autherimage: profiles.imageUrl,
                        question: ques,
                        description: desc,
                        category: category,
                        postType: "QUERY"
                    });
                    console.log(res);
                    console.log("post request success");
                    window.location.reload();
                } catch (err) {
                    console.log(err);
                }
            } else {
                alert('Empty Question, Description, or Category');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'question') {
            setQues(value);
        } else if (name === 'category') {
            setCategory(value);
        } else {
            setDesc(value);
        }
    };

    return (
        <div className='boss'>
            <div className='ques'>
                <div className='q'>
                    Question
                    <textarea
                        name="question"
                        className='type-ques'
                        placeholder='How can I ensure my app complies with legal regulations, such as GDPR or COPPA, regarding user data privacy? Also How do I handle app localization and language support efficiently?'
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className='category'>
                    Category
                    <input
                        name="category"
                        className='category-input'
                        placeholder='Enter Category'
                        onChange={handleChange}
                    />
                </div>
                <div className='description'>
                    Description
                    <textarea
                        name="description"
                        className='desp'
                        placeholder='Add a Description'
                        onChange={handleChange}
                    ></textarea>
                </div>
            </div>
            <div className='cancel'>
                <button className='can' onClick={props.ShowMain}>Cancel</button>
                <button className='post' onClick={handleSubmit}>Post</button>
            </div>
        </div>
    );
}

export default AskQuery;
