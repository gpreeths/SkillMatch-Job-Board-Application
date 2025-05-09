import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
  const [role, setRole] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Role being sent: ", role);  // Add this line to check the role value
    try {
      const response = await axios.post('http://localhost:2000/user/signup', { role, name, email, password });
      console.log("Signup response: ", response);  // Log the response
      navigate('/login');
    } catch (err) {
      console.error("Signup error: ", err);  // Log the error
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="role">I am a:</label><br />
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="employee">Employee</option>
          <option value="employer">Employer</option>
        </select><br /><br />
        
        <label htmlFor="name">Name:</label><br />
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="email">Email:</label><br />
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Signup
