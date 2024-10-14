import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const AllSecrets = () =>{
    const [allUserData, setAllUserData ]= useState([]);
    const [usersSecrets, setUsersSecret] = useState([]);
    useEffect(()=>{
        const getData = async() =>{
            try {
                const response = await axios.get(`${process.env.API_URL}/api/userdata`)
                setAllUserData(response.data);
                // console.log(response.data);
                
            } catch (error) {
                console.log(error);
                
            }
        }
        getData()
        
    },[])
    
    useEffect(()=>{
        const secrets = [];
        for (let i = 0; i < allUserData.length; i++) {
            for (let j = 0; j < allUserData[i].secrets.length; j++) {
                
                secrets.push(allUserData[i].secrets[j])
                
            }
            
        }
        setUsersSecret(secrets)
    }, [allUserData])

    return(
        <div>
        
            {usersSecrets.map((card, i)=>(
                <Card key={i} secret={card} />
            ))}


        </div>
    )
}

export default AllSecrets;