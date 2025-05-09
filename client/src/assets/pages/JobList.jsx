import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Menu2 } from '../components/Menu';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:2000/job/getalljob');
      console.log('API response:', res.data);
      setJobs(res.data.jobs);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;
  
    const token = localStorage.getItem('token'); // ⬅️ Get the token
  
    try {
      await axios.delete(`http://localhost:2000/job/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // ⬅️ Add token to request headers
        }
      });
      setJobs(jobs.filter((job) => job._id !== id));
      alert("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to delete job");
    }
  };
  

  return (
    <div className="job-list-container">
      <Menu2/>
      <h2>Available Jobs</h2>

      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="job-cards">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Description:</strong> {job.description}</p>
              
              <div className="btn-group">
                <Link to={`/jobapply/${job._id}`}>
                  <button className="apply-btn">Apply Now</button>
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(job._id)}
                  style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobList;
