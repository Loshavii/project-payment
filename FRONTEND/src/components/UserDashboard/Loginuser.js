
import React, { useState } from 'react';
import { Mail, Lock, Loader, User, Key, Shield, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';
import axios from 'axios';

const Loginuser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Invalid email address');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Password is required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:2003/api/users/login', { email, password });
      const { token, id, role } = response.data;

      // Save login data to sessionStorage
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('id', id);
      sessionStorage.setItem('role', role);

      setErrorMessage('');

      // Redirect based on user role
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'user') {
        navigate('/user-dashboard');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Invalid login credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Left side - Login Form */}
      <div className="login-form-container">
        <div className="login-form">
          {/* Welcome Text */}
          <div className="welcome-text">
            <h1>Welcome Back!</h1>
            <p>Sign in to continue your journey</p>
          </div>

          {/* Avatar */}
          <div className="avatar">
            <div className="avatar-gradient">
              <div className="avatar-inner">
                <User size={32} className="avatar-icon" />
              </div>
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="orbit-dot" style={{ animationDelay: `${i * 1.2}s` }} />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="form1">
            {/* Email Input */}
            <div className={`form-group1 ${focusedInput === 'email' ? 'focused' : ''}`}>
              <div className="input-wrapper1">
                <Mail className={`input-icon1 ${focusedInput === 'email' ? 'focused' : ''}`} size={20} />
                <input
                  type="email"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  className="login-input1"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className={`form-group1 ${focusedInput === 'password' ? 'focused' : ''}`}>
              <div className="input-wrapper1">
                <Lock className={`input-icon1 ${focusedInput === 'password' ? 'focused' : ''}`} size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  className="login-input1"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`login-submit-button ${isLoading ? 'loading' : ''}`}
            >
              <span className="button-text">LOGIN</span>
              {isLoading && <Loader className="loader" size={20} />}
            </button>
          </form>
        </div>
      </div>

      {/* Right side - Animated Illustration */}
      <div className="illustration">
        {/* Animated circles in background */}
        <div className="circles-background">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="circle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }} />
          ))}
        </div>

        {/* Content */}
        <div className="illustration-content">
          <h2>Secure Access Portal</h2>
          <div className="features">
            {[
              { icon: Shield, title: "Enhanced Security", desc: "Multi-layer protection for your data" },
              { icon: Key, title: "Smart Access", desc: "Intelligent authentication system" },
              { icon: Activity, title: "Real-time Monitoring", desc: "Track activity instantly" },
              { icon: User, title: "User Friendly", desc: "Seamless login experience" }
            ].map((feature, index) => (
              <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <feature.icon className="feature-icon" />
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom text */}
          <p className="create-account">
            New to our platform?
            <button className="create-account-button" onClick={() => navigate('/register-user')}>
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loginuser;
