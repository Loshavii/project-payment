
import React, { useState } from 'react';
import { Mail, Lock, Loader, User, Key, Shield, Edit3, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../CSS/RegisterUser.css';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!specialization.trim()) newErrors.specialization = 'Specialization is required';
    if (!experience.trim()) {
      newErrors.experience = 'Experience is required';
    } else if (isNaN(experience) || experience <= 0) {
      newErrors.experience = 'Experience must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:2003/api/coaches/register', {
        username,
        email,
        password,
        specialization,
        experience
      });
      setSuccessMessage('Registration successful. Please wait for admin verification.');
      setErrorMessage('');
      setUsername('');
      setEmail('');
      setPassword('');
      setSpecialization('');
      setExperience('');
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
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
            <div className={`form-group2 ${focusedInput === 'username' ? 'focused' : ''}`}>
              <div className="input-wrapper2">
                <Edit3 className={`input-icon2 ${focusedInput === 'username' ? 'focused' : ''}`} size={20} />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedInput('username')}
                  onBlur={() => setFocusedInput(null)}
                  className="register-input"
                />
              </div>
              {errors.username && <p className="error-message">{errors.username}</p>}
            </div>

            <div className={`form-group2 ${focusedInput === 'email' ? 'focused' : ''}`}>
              <div className="input-wrapper2">
                <Mail className={`input-icon2 ${focusedInput === 'email' ? 'focused' : ''}`} size={20} />
                <input
                  type="email"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  className="register-input"
                />
              </div>
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className={`form-group2 ${focusedInput === 'password' ? 'focused' : ''}`}>
              <div className="input-wrapper2">
                <Lock className={`input-icon2 ${focusedInput === 'password' ? 'focused' : ''}`} size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  className="register-input"
                />
              </div>
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            <div className={`form-group2 ${focusedInput === 'specialization' ? 'focused' : ''}`}>
              <div className="input-wrapper2">
                <Briefcase className={`input-icon2 ${focusedInput === 'specialization' ? 'focused' : ''}`} size={20} />
                <input
                  type="text"
                  placeholder="Specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  onFocus={() => setFocusedInput('specialization')}
                  onBlur={() => setFocusedInput(null)}
                  className="register-input"
                />
              </div>
              {errors.specialization && <p className="error-message">{errors.specialization}</p>}
            </div>

            <div className={`form-group2 ${focusedInput === 'experience' ? 'focused' : ''}`}>
              <div className="input-wrapper2">
                <Key className={`input-icon2 ${focusedInput === 'experience' ? 'focused' : ''}`} size={20} />
                <input
                  type="number"
                  placeholder="Years of Experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  onFocus={() => setFocusedInput('experience')}
                  onBlur={() => setFocusedInput(null)}
                  className="register-input"
                />
              </div>
              {errors.experience && <p className="error-message">{errors.experience}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`register-submit-button ${isLoading ? 'loading' : ''}`}
            >
              <span className="button-text">REGISTER</span>
              {isLoading && <Loader className="loader" size={20} />}
            </button>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
              { icon: Key, title: "Easy Login", desc: "Simplified access to your dashboard" },
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
