import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './Login.css';

// const login_post_url = "http://localhost:3001/login";

export default function Login(){
    const [usernameUserInput, setusernameUserInput] =  useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    function handleSubmit(event){
        event.preventDefault();
        const data = {
            "username": usernameUserInput,
            password: password,
        };
        console.log(data);
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Returned backend data from login: ", data);
            if (data.type === "error") {
                setError(data.message);
            }
            if (data.type === "success") {
                navigate("/", { state: { "username": usernameUserInput, success: data.message } }); 
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Log In</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {location.state?.success && <div className="alert alert-success">{location.state?.success}</div>}
            <div className="form-group">
                <label htmlFor="inputusername">Username</label>
                <input type="username" className="form-control" id="inputusername" aria-describedby="usernameHelp" placeholder="Enter username"
                onChange={(event) => setusernameUserInput(event.target.value)}/>
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            <div className="form-group">
                <label htmlFor="inputPassword">Password</label>
                <input type="password" className="form-control" id="inputPassword" placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
