import React from "react";

const Navbar = (props) =>{

    const logout = () => {
        localStorage.clear();
        window.open("/auth/logout", "_self")

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