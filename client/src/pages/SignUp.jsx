import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [info, setInfo] = useState({});
  
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };


  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/check-email`,
        { email }
      );
      return response.data.exists;
    } catch (err) {
      console.error("Error checking email", err);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    if (info.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const emailExists = await checkEmailExists(info.email);

    if (emailExists) {
      alert("User already exists, Please login");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/signup`,
        info
      );
      console.log("User signed up:", response.data);
      alert("user sign up sucessfully");
      navigate("/login");
    } catch (error) {
      console.log("Error signing up:", error);
    }
  };

  return (
    <div className="regipage">
      <span> Register Yourself 📃</span>
      <br />

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Full name"
          name="name"
          change={handleChange}
        />
        <br />
        <Input
          type="email"
          placeholder="Email Id"
          name="email"
          change={handleChange}
        />
        <br />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          change={handleChange}
          
        />
        <br />
        <br />
        <button type="submit" className="fill">
          Register
        </button>
        <div className="already ">
          already registered?...{" "}
          <Link to={"/login"}>
            <strong className="already-sub">login</strong>
          </Link>{" "}
        </div>
      </form>
    </div>
  );
}

export default SignUp;
