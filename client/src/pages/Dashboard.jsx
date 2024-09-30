import React, { useState } from "react";
import axios from 'axios'
import { useEffect } from "react";
import Navbar from "./Navbar";
import AllSecrets from "./AllSecrets";
import PostSecret from "./PostSecret";
import { useParams } from "react-router-dom";
import IndividualSecrets from "./IndividualSecrets";
import Footer from "./Footer";
function Dashboard (){
    const {userId} = useParams();
    const [loginUser, setLoginUser] = useState({});
    const [showAllSecrets, setShowAllSecrets] = useState(true);

  
    useEffect(()=>{
        const fetchUser = async () =>{
            try {
                const response = await axios.get("http://localhost:5000/api/getDetails", {params: {userId}})
                    setLoginUser(response.data)
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchUser()
    },[userId]);

   

    return(
        <div>
        <Navbar name={loginUser.name} />
         <div className="secretPage">
        <span className="title1">
          welcome{" "}
          <p className="subtitle">
            to the 🌎 of secrets🔑
          </p>
            <p className="infoline">within 120 words</p>
        </span>
        <PostSecret />
        <div style={{ margin: "20px 0px" }}>
          <button className="special-btn"  onClick={()=> setShowAllSecrets(true)}>
            All Secrets
          </button>

          <button className="special-btn" onClick={()=> setShowAllSecrets(false)}>
            My Secrets
          </button>
        </div>
        <div>
        <h3>Whisper Wall</h3>
        { showAllSecrets ? <AllSecrets /> : <IndividualSecrets />}
          
        </div>
        <Footer />
      </div>
        
        </div>
    )
}

export default Dashboard;