import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './AuthProvider';

export default function Header(props){
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();

    function logOut(event){
        auth.logout();
        navigate("/", { state: { success: "You have been logged out" } });
    }
 


    return (
        <header className="mb-auto">
            <div>
            {/* <h3 className="float-md-start mb-0">1 Generative Studio</h3> */}
            <nav className="nav nav-masthead justify-content-center float-md-end">
                <Link to="/" className="nav-link fw-bold py-1 px-0 active" state={{"username": auth.username}}>Home</Link>
                {(auth.username != null) ? <Link to="/chat" className="nav-link fw-bold py-1 px-0 active" aria-current="page">Chat</Link> : ""}                
                {(auth.username != null) ? <Link to="/" onClick={logOut} className="nav-link fw-bold py-1 px-0 active">Log Out</Link> : "" }
                {/* <a className="nav-link fw-bold py-1 px-0" href="#">Features</a> */}
                {/* <a className="nav-link fw-bold py-1 px-0" href="#">Contact</a> */}
            </nav>
            </div>
      </header>
    )
}