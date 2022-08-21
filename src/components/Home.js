import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import  CoverPage  from  './CoverPage';


export function Home(props) {
    const location = useLocation();
    return(
        <div>Welcome Home {props.username || location.state?.username}</div>
    )
}

export default function ProtectHome (props){
    const location = useLocation();
    const isAuthenticated = (props.username?.length > 0) || (location.state?.username) ? true : false; 
    return isAuthenticated ? <Home  username={props.username} /> : <CoverPage />;
} 
