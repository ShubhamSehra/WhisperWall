import React, { useState } from 'react'
import Input from '../components/Input';
import { useNavigate, useParams} from "react-router-dom"
import axios from 'axios';


function PostSecret() {
    
    const {userId} = useParams();    
    const [userSecret, setUserSecret] = useState('')
    const navigate = useNavigate();
   const handleChange = (e) =>{
    const {name, value} = e.target;
    setUserSecret({...userSecret, [name]: value});
   }
   
   const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/api/postsecret`,{
        secret: userSecret.secret,
        id: userId,
    }).then(()=>{
        navigate('/');
    })
   }
  return (
    <div>
    <form className='submit' onSubmit={handleSubmit}>
       
      <Input 
        placeholder={"Share your secret!!!"}
        type= "text"
        name= "secret"
        length= "120"
        change= {handleChange}
      />
      <button className='fill' type='submit' >
      Share🔑
      </button>
    </form>
    </div>
  )
}

export default PostSecret;
