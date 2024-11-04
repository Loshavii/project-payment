
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader, User, Key, Shield, Activity } from 'lucide-react';
import axios from 'axios';
import '../CSS/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email.');
      return false;
    }
    if (!password.trim()) {
      setErrorMessage('Password is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:2003/api/coaches/login', { email, password });
      const { token, id, role } = response.data;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('id', id);
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('coachEmail', email);

      setErrorMessage('');
      setSuccessMessage('Login successful! Redirecting...');
      
      setTimeout(() => {
        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else if (role === 'coach') {
          navigate('/coach-dashboard');
        } else if (role === 'user') {
          navigate('/user-dashboard');
        }
      }, 1500);
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(error.response?.data?.message || 'Invalid login credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <div className="login-form">
          <div className="welcome-text">
            <h1>Welcome Back!</h1>
            <p>Sign in to continue your journey</p>
          </div>

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

            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

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

      <div className="illustration">
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

          <p className="create-account">
            New to our platform? <button className="create-account-button">Create an account</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
