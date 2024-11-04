
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/CoachProfile.css'; // Import your CSS

const CoachProfile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    nickName: '',
    gender: '',
    age: '',
    education: '',
    country: '',
    location: '',
    language: '',
    timeZone: '',
    email: '', // This will be fetched dynamically
    bio: '',
    qualification: '',
    coachingStyle: '',
    availability: ''
  });

  const [coach, setCoach] = useState(null); // Store coach details fetched from the API

  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        const coachId = sessionStorage.getItem('id'); // Fetch coach ID from session storage
        const token = sessionStorage.getItem('token'); // Fetch token from session storage
        if (coachId && token) {
          const response = await axios.get(`http://localhost:2003/api/coaches/coaches/${coachId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const coachData = response.data;
          setCoach(coachData); // Store the fetched coach data
          setProfile({
            fullName: `${coachData.firstName} ${coachData.lastName}`, // Assuming firstName and lastName are in the API response
            nickName: coachData.nickName || '',
            gender: coachData.gender || '',
            age: coachData.age || '',
            education: coachData.education || '',
            country: coachData.country || '',
            location: coachData.location || '',
            language: coachData.language || '',
            timeZone: coachData.timeZone || '',
            email: coachData.email || '', // Fill email dynamically
            bio: coachData.bio || '',
            qualification: coachData.qualification || '',
            coachingStyle: coachData.coachingStyle || '',
            availability: coachData.availability || ''
          });
        }
      } catch (error) {
        console.error('Error fetching coach data:', error);
      }
    };

    fetchCoachData();
  }, []);


  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2003/api/coachesProfiles/profile', profile);
      console.log('Profile saved:', response.data);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="coach-profile">
      <h1>Welcome, {coach ? coach.firstName : 'Coach'}</h1>
      <div className="profile-header">
        <img src="/path/to/profile/image" alt="Profile" className="profile-image" />
        <div className="profile-name">
          <h2>{coach ? `${coach.firstName} ${coach.lastName}` : 'Loading...'}</h2>
          <p>{profile.email}</p>
        </div>
        <button className="edit-button">Edit</button>
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Your Full Name"
              value={profile.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nickName">Nick Name</label>
            <input
              type="text"
              id="nickName"
              name="nickName"
              placeholder="Your Nick Name"
              value={profile.nickName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={profile.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Your Age"
              value={profile.age}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="education">Education</label>
            <input
              type="text"
              id="education"
              name="education"
              placeholder="Your Education"
              value={profile.education}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="qualification">Qualification</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              placeholder="Your Qualification"
              value={profile.qualification}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Your Bio"
            value={profile.bio}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="coachingStyle">Coaching Style</label>
          <textarea
            id="coachingStyle"
            name="coachingStyle"
            placeholder="Your Coaching Style"
            value={profile.coachingStyle}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <textarea
            id="availability"
            name="availability"
            placeholder="Your Availability"
            value={profile.availability}
            onChange={handleChange}
          />
        </div>
        <div className="form-group email-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            disabled
          />
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default CoachProfile;


