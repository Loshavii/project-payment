

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/ProfileSetup.css';

function ProfileSetup() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    height: '',
    weight: '',
    bloodType: '',
    allergies: '',
    chronicConditions: '',
    medications: '',
    dietaryPreferences: '',
    exerciseRoutine: '',
    sleepPattern: '',
    targetWeight: '',
    fitnessObjectives: '',
    bloodPressure: '',
    heartRate: '',
    bloodSugarLevels: '',
    contactOption: '', // New field for contact option
    coachEmail: '', // Store coach email from session storage
  });

  const [message, setMessage] = useState(''); // To display success or error message

  // Fetch coachEmail from sessionStorage when the component loads
  useEffect(() => {
    const storedCoachEmail = sessionStorage.getItem('coachEmail');
    if (storedCoachEmail) {
      setFormData((prevData) => ({
        ...prevData,
        coachEmail: storedCoachEmail, // Set coachEmail in formData
      }));
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission and saving the profile to MongoDB
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2003/api/profiles/', formData);
      setMessage('Profile saved successfully!');
      console.log('Profile saved:', response.data);
    } catch (error) {
      setMessage('Error saving profile.');
      console.error('There was an error saving the profile:', error);
    }
  };

  return (
    <div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Personal Information</h2>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <h2 className="form-title">Health Information</h2>
        <div className="form-group">
          <label>Height (cm):</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Blood Type:</label>
          <input
            type="text"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Allergies:</label>
          <textarea
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Chronic Conditions:</label>
          <textarea
            name="chronicConditions"
            value={formData.chronicConditions}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Medications:</label>
          <textarea
            name="medications"
            value={formData.medications}
            onChange={handleChange}
          />
        </div>

        <h2 className="form-title">Lifestyle Information</h2>
        <div className="form-group">
          <label>Dietary Preferences:</label>
          <input
            type="text"
            name="dietaryPreferences"
            value={formData.dietaryPreferences}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Exercise Routine:</label>
          <textarea
            name="exerciseRoutine"
            value={formData.exerciseRoutine}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Sleep Pattern (hours):</label>
          <input
            type="number"
            name="sleepPattern"
            value={formData.sleepPattern}
            onChange={handleChange}
          />
        </div>

        <h2 className="form-title">Fitness Goals</h2>
        <div className="form-group">
          <label>Target Weight (kg):</label>
          <input
            type="number"
            name="targetWeight"
            value={formData.targetWeight}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Fitness Objectives:</label>
          <textarea
            name="fitnessObjectives"
            value={formData.fitnessObjectives}
            onChange={handleChange}
          />
        </div>

        <h2 className="form-title">Health Metrics</h2>
        <div className="form-group">
          <label>Blood Pressure:</label>
          <input
            type="text"
            name="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Heart Rate (bpm):</label>
          <input
            type="number"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Blood Sugar Levels:</label>
          <input
            type="text"
            name="bloodSugarLevels"
            value={formData.bloodSugarLevels}
            onChange={handleChange}
          />
        </div>


<div className="contact-options-container">
  <h2 className="form-title">Contact Options</h2>
  <div className="form-group">
    <label className="form-label">How would you like to contact the coach?</label>
    <div className="contact-options">
      <label className="contact-option">
        <input
          type="radio"
          name="contactOption"
          value="chat"
          onChange={handleChange}
          className="custom-radio"
        />
        <span className="option-label">💬 Contact via Chat</span>
      </label>
      <label className="contact-option">
        <input
          type="radio"
          name="contactOption"
          value="video"
          onChange={handleChange}
          className="custom-radio"
        />
        <span className="option-label">📹 Contact via Video Interaction</span>
      </label>
    </div>
  </div>
</div>


        <div className="button-group">
          <button type="submit">Save Profile</button>
        </div>

        {/* Display success or error message */}
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default ProfileSetup;
