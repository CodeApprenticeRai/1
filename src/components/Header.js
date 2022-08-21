import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Header(props){
    const location = useLocation();
    const navigate = useNavigate();

    function logOut(event){
        props.setUsername(null);
        navigate("/", { state: { success: "You have been logged out" } });
    }

    var username = "";
    if(props.username > ""){
        username = props.username;
    } else if (location.state?.username > ""){
        username = location.state.username;
    }

    return (
        <header className="mb-auto">
            <div>
            {/* <h3 className="float-md-start mb-0">1 Generative Studio</h3> */}
            <nav className="nav nav-masthead justify-content-center float-md-end">
                <Link to="/" className="nav-link fw-bold py-1 px-0 active" state={{"username": username}}>Home</Link>
                {(username > "") ? <Link to="/" onClick={logOut} className="nav-link fw-bold py-1 px-0 active">Log Out</Link> : "" }
                {/* <a className="nav-link fw-bold py-1 px-0 active" aria-current="page" href="#">Home</a> */}
                {/* <a className="nav-link fw-bold py-1 px-0" href="#">Features</a> */}
                {/* <a className="nav-link fw-bold py-1 px-0" href="#">Contact</a> */}
            </nav>
            </div>
      </header>
    )
}