import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import AllSecrets from "./AllSecrets";
import PostSecret from "./PostSecret";
import IndividualSecrets from "./IndividualSecrets";
import Footer from "./Footer";

function Dashboard() {
  const { userId } = useParams();
  const [loginUser, setLoginUser] = useState({});
  const [showAllSecrets, setShowAllSecrets] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/getDetails`, { params: { userId } });
          console.log('Fetched User: ', response.data);
          setLoginUser(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    
  }, [userId, navigate]);

  console.log('Login User:', loginUser);

  return (
    <div>
      <Navbar name={loginUser.name} />
      <div className="secretPage">
        <span className="title1">
          welcome{" "}
          <p className="subtitle">
            to the wall of secrets
          </p>
          <p className="infoline">within 120 words</p>
        </span>
        <PostSecret />
        <div style={{ margin: "20px 0px" }}>
          <button className="special-btn" onClick={() => setShowAllSecrets(true)}>
            All Secrets
          </button>
          <button className="special-btn" onClick={() => setShowAllSecrets(false)}>
            My Secrets
          </button>
        </div>
        <div>
          <h3>Whisper Wall</h3>
          {showAllSecrets ? <AllSecrets /> : <IndividualSecrets />}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
