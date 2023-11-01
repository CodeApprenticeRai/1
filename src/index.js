import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  BrowserRouter, 
  Routes,
  Route,
} from 'react-router-dom';

import './index.css';
import App from './App';
// import CoverPage from './components/CoverPage';
import SignUp from './components/SignUp';
import LogIn from './components/Login/LogIn';
import Chat from './components/Chat';
import ProtectHome from './components/Home';

import reportWebVitals from './reportWebVitals';
import { RequireAuth } from './components/RequireAuth';

const root = ReactDOM.createRoot(document.body);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="/" element={<ProtectHome />} />
          <Route path="/chat" element={<RequireAuth><Chat /></RequireAuth>} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Route>
        <Route path="*" element={<div>404 Not Found.</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
