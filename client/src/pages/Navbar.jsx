import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar = (props) =>{
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login')

    }
    
    

    return(
        <div className="nav" >
            <span style={{textTransform: "capitalize"}} > Hello {props.name}</span>

            <button className="posi" onClick={logout}>
                Logout
            </button>
        </div>
    )
}

export default Navbar;