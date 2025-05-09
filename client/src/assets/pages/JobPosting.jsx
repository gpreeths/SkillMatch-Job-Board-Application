import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Menu2 } from '../components/Menu';

function JobPosting() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [companyName, setCompanyName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = { title, description, location, salary, companyName };

    try {
      const res = await axios.post('http://localhost:2000/job/createjob', jobData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.status === 201) {
        alert('Job post created successfully');
        navigate('/joblist'); // Redirect to job listings page
      }
    } catch (err) {
      console.error(err);
      alert('Error creating job post');
    }
  };

  return (
    <>
    <Menu2/>
    <div className="job-posting-container">
      <h2>Create Job Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Job Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <label htmlFor="salary">Salary:</label>
        <input
          type="number"
          id="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />

        <label htmlFor="companyName">Company Name:</label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />

        <button type="submit">Post Job</button>
      </form>
    </div>
    </>
  );
}

export default JobPosting;
