import React from "react";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faKey} from '@fortawesome/free-solid-svg-icons'
function Home() {
  return (
    <div className="App">
      <header className="App-header">
      <FontAwesomeIcon icon={faKey} size="5x" />
        <span className="mainTitle">Whisper Wall</span>
        <span className="subTitle">Share Your Secrets ANONYMOUSLY!</span>
        <hr
          style={{
            background: "white",
            height: "0.02rem",
            width: "70%",
            margin: "1.2rem"
          }}
        />
        <div className="flex">
        <Link type="button" to={'/signup'} className="fill">
            Sign up
        </Link>
        <Link type="button" to={'/login'} className="fill">
            login
        </Link>
        </div>
     
      </header>
    </div>
  );
}

export default Home;