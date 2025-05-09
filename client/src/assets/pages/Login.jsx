import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:2000/user/login', { email, password })
      localStorage.setItem('token', res.data.token)
      const decodedToken = decodeJWT(res.data.token)

      if (decodedToken.role === 'employee') {
        navigate('/joblist') // Redirecting employee to /getalljob
      } else if (decodedToken.role === 'employer') {
        navigate('/jobpost') // Redirecting employer to /createjob
      }

      alert('Login successful')
    } catch (err) {
      console.error(err)
      alert('Invalid credentials')
    }
  }

  const decodeJWT = (token) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        <Link to="/signup">Don't have an account? Sign up</Link><br /><br />
        <Link to="/forgotpassword">Forgot Password?</Link>
      </p>
    </div>
  )
}

export default Login
