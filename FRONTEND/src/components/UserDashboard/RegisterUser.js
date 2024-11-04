import React, { useState } from 'react';
import { Mail, Lock, Loader, User, Shield, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../CSS/RegisterUser.css';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, email, password } = formData;
    const newErrors = {};

    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:2003/api/users/register', formData);
      setSuccessMessage('Account created successfully!');
      setErrorMessage('');
      setFormData({
        username: '',
        email: '',
        password: ''
      });
      navigate('/user-dashboard');
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/loginuser');
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <div className="register-form">
          <div className="welcome-text">
            <h1>Create an Account!</h1>
            <p>Start your journey with us today</p>
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

          <form onSubmit={handleSubmit} className="form">
            {/* Username Input */}
            <div className={`form-group2 ${focusedInput === 'username' ? 'focused' : ''}`}>
              <div className="input-wrapper2">
                <Edit3 className={`input-icon2 ${focusedInput === 'username' ? 'focused' : ''}`} size={20} />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedInput('username')}
                  onBlur={() => setFocusedInput(null)}
                  className="register-input"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className={`form-group2 ${focusedInput === 'email' ? 'focused' : ''}`}>
              <div className="input-wrapper2">
                <Mail className={`input-icon2 ${focusedInput === 'email' ? 'focused' : ''}`} size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  className="register-input"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className={`form-group2 ${focusedInput === 'password' ? 'focused' : ''}`}>
              <div className="input-wrapper2">
                <Lock className={`input-icon2 ${focusedInput === 'password' ? 'focused' : ''}`} size={20} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  className="register-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`register-submit-button ${isLoading ? 'loading' : ''}`}
            >
              <span className="button-text">REGISTER</span>
              {isLoading && <Loader className="loader" size={20} />}
            </button>
            {successMessage && <p className="success">{successMessage}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}
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
          <h2>Join Our Community</h2>
          <div className="features">
            {[
              { icon: Shield, title: "Account Protection", desc: "Secure registration process" },
              { icon: Edit3, title: "Personalized Profile", desc: "Customize your experience" },
              { icon: User, title: "Community Access", desc: "Connect with others" }
            ].map((feature, index) => (
              <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <feature.icon className="feature-icon" />
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>

          <p className="have-account">
            Already have an account? <button className="login-button" onClick={handleLoginRedirect}>Log In</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
