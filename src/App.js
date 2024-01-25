import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import React from 'react';
import './App.css';
import Tasks from './components/Tasks';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
import Signup from './components/Signup';


const App = () => {




  return (
    <>

      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>

        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Tasks />} />
        </Routes>


      </Router>
      <Toaster />
    </>
  );
};

export default App;



