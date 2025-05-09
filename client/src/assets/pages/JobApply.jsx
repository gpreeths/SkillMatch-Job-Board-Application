import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Menu2 } from '../components/Menu'

function JobApply() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    coverLetter: ''
  })

  const token = localStorage.getItem('token')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`http://localhost:2000/job/apply/${jobId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert('Application submitted successfully')
      navigate('/joblist')
    } catch (error) {
      console.error("Error applying for job", error.response?.data || error)
      alert(error.response?.data?.message || "Application failed")
    }
  }

  return (
    <> 
    <Menu2/>
    <div className="apply-page-container">
      
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="coverLetter">Cover Letter</label>
          <textarea id="coverLetter" name="coverLetter" required rows="5" onChange={handleChange}></textarea>
        </div>

        <button type="submit" className="apply-btn">Submit Application</button>
      </form>
    </div>
    </>
  )
}

export default JobApply
