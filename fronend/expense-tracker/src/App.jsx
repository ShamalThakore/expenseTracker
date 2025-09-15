import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import  UserProvider from './context/UserContext';

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SingUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expence from './pages/Dashboard/Expence';
import { Toaster } from  'react-hot-toast';

function App() {
  return (
  
      <UserProvider>
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<Root />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/income" element={<Income />} />
              <Route path="/expence" element={<Expence />} />
            </Routes>
          </Router>
        </div>

        <Toaster toastOptions={{className: "", style: {fontSize:'13px'}}}/>

      </UserProvider>
  
  )
}

export default App

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated
    ? <Navigate to="/dashboard" />
    : <Navigate to="/login" />;
};
