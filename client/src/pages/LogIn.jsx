import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const Login = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUser({...user,[name]:value});
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError('');
        try {
          const response = await axios.post('http://localhost:5000/api/login',user);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('id', response.data.user._id);
          console.log(response);
          
          const id = response.data.user._id;
          navigate(`/dashboard/${id}`);
        } catch (error) {
          setError('Invalid credentials')
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
          {/*{auth ? <h4 className="errorlogin"> user does not exist ❌ </h4> : null}*/}
        </form>
  
        {/* <button type="submit" className="fill" onClick={google}>
          google
        </button> */}
      </div>
    )
}

export default Login;