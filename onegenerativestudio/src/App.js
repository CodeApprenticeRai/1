// import logo from './logo.svg';
import { 
  // Routes,
  // Route,
  Outlet
} from 'react-router-dom';
import { useState } from 'react';

import { AuthProvider } from './components/AuthProvider';
import Header from './components/Header';
import Footer from './components/Footer';
// import MainContent from './components/CoverPage';

import './App.css';


function App() {
  const [username, setUsername] = useState("");

  return (
    <AuthProvider>
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <Header setUsername={setUsername} username={username} />
        <Outlet setUsername={setUsername} username={username} />
        <Footer/> 
      </div>
    </AuthProvider>
  );
}

export default App;
