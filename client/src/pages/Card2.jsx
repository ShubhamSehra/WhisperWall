import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams } from "react-router-dom";

function Card2(props) {
    const {userId} = useParams();
    const trashClicked = async() =>{
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/deleteSecret`,{    
                secret: props.secret,
                id: userId,
            });
            window.location.reload();
            
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <>
      <div className="card-container">
      <div>
        <p>{props.secret}</p>
      </div>
      <div className="trash">
        <button onClick={trashClicked}>
        <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      </div>
    </>
  );
}

export default Card2;
