import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './LoginPage.css';
import { login } from '../services/api/auth.api.js';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password })
      navigate('/')
    } catch (error) {
      console.log(error.message || 'Login failed')
    }
  };

  return (
    <div className="login-container">
      <img className='login__img' src="../../public/login_img.jpg" alt="" />
      <div className="login-form">
        <h2 className="login-title">Welcome To Sharead</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;