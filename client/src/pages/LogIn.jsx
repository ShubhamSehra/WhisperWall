import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useEffect } from "react";

const Login = () => {
    const [user, setUser] = useState({});
   
    const navigate = useNavigate();

    useEffect(()=>{
      const token = localStorage.getItem('token');
      console.log(token);
      
      if(token){
        navigate(`/dashboard/${localStorage.getItem('id')}`);
      }
    }, [navigate])

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser({...user,[name]:value});
    }
    const handleSubmit = async(e) =>{
      e.preventDefault();
      
      if (user.password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`,user);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('id', response.data.user._id);
          console.log(response);
          
          const id = response.data.user._id;
          console.log("user ID:", id);
          
          navigate(`/dashboard/${id}`);
        } catch (error) {
          if (error.response) {
            if (error.response.status === 401) {
              alert("Incorrect password");
            } else if (error.response.status === 404) {
              alert("User does not exist");
            } else {
              alert("An error occurred");
            }
          } else {
            alert("Network error");
          }
        }
    }
    return(
        <div className="regipage">
        <span> Login Here 🚀</span>
        <br />
        <form onSubmit={handleSubmit}>    
          <Input
            placeholder="Email Id"
            type="email"
            name="email"
            change={handleChange}
          />
          <br />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            change={handleChange}
          />
          <br />
          <br />
          <button type="submit" className="fill">
            login
          </button>
          <div className="already ">
            not registered yet?...{" "}
            <Link to={"/signup"}>
              <strong className="already-sub">Register</strong>
            </Link>{" "}
          </div>
          
        </form>
  
        
      </div>
    )
}

export default Login;