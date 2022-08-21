import { useState } from 'react';
// import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
// import { UserContext } from './App';

// todo: update this for production
// const sign_up_post_url = "http://localhost:3001/sign_up";

// function post(url, data) {
//     return fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//     });
// }


export default function SignUp(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // const [loading, setLoading] = useState(false);

    function handleSubmit(event){
        event.preventDefault();
        const data = {
            username: username,
            password: password,
            email: email
        };
        fetch('http://localhost:3001/sign_up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            
            if (data.type === "error") {
                setError(data.message);
            }
            if (data.type === "success") {
                navigate("/login", { state: { success: data.message } }); 
            }
        })
        //then redirect with message
    }

    return (        
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
                <label htmlFor="inputEmail">Email address</label>
                <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"
                    value={email} onChange={(event) => setEmail(event.target.value)}
                />
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            <div className="form-group">
                <label htmlFor="inputUsername">Username</label>
                <input type="username" className="form-control" id="inputUsername" aria-describedby="usernameHelp" placeholder="Enter username"
                    value={username} onChange={(event) => setUsername(event.target.value)}
                />
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            <div className="form-g  roup">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                    value={password} onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )   
}

//action={postSignUpForm} method="POST"