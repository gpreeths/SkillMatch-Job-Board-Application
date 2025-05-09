import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './assets/pages/Home.jsx';
import Login from './assets/pages/Login.jsx';
import Signup from './assets/pages/Signup.jsx'; 
import JobPosting from './assets/pages/JobPosting.jsx';
import JobList from './assets/pages/JobList.jsx';
import JobApply from './assets/pages/JobApply.jsx';

function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/jobpost" element={<JobPosting />} />
      <Route path="/joblist" element={<JobList />} />
      <Route path="/jobapply/:jobId" element={<JobApply />} />
      

    </Routes>
      
    </>
  )
}

export default App
