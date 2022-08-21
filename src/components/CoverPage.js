import { Link } from 'react-router-dom';

export default function CoverPage(){
    return(
        <main className="px-3">
            <h1>1 Generative Studio</h1>
            <p className="lead">
            <Link to="/sign_up" className="btn btn-lg btn-secondary fw-bold border-white bg-white" >Sign Up</Link>
            </p>
            <p className="lead">
            <Link to="/login" className="btn btn-lg btn-secondary fw-bold border-white bg-white" >Log In</Link>
            </p>
        </main>
    )
}