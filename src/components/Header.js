import { Link } from 'react-router-dom';

export default function Header(){
    return (
        <header className="mb-auto">
            <div>
            {/* <h3 className="float-md-start mb-0">1 Generative Studio</h3> */}
            <nav className="nav nav-masthead justify-content-center float-md-end">
                <Link to="/" className="nav-link">Home</Link>
                {/* <a className="nav-link fw-bold py-1 px-0 active" aria-current="page" href="#">Home</a> */}
                {/* <a className="nav-link fw-bold py-1 px-0" href="#">Features</a> */}
                {/* <a className="nav-link fw-bold py-1 px-0" href="#">Contact</a> */}
            </nav>
            </div>
      </header>
    )
}