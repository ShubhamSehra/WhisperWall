import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card2 from "./Card2";

const IndividualSecrets = () =>{
    const [user, setUser] = useState([]);
const {userId} = useParams();

useEffect(()=>{
    const getData = async() =>{
        
        try {
            const response = await axios.get('http://localhost:5000/api/getDetails', {params: {userId}})
            setUser(response.data.secrets)
            console.log(response.data.secrets);
            
        } catch (error) {
            console.log(error);
            
        }
    }
    getData()
},[userId]);
  

    return(
        <div>
                {user.map((card,i)=>(
                     <Card2 key={i} secret={card} />
                ))}
        </div>
    )
}

export default IndividualSecrets;