
import "../CSS/CoachDetail.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function CoachDetail() {
  const navigate = useNavigate();
  const { coachEmail } = useParams(); // Fetch the email from the URL
  const [coachProfile, setCoachProfile] = useState(null);
  const [ setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    // Fetch coach profile based on coachEmail
    const fetchCoachProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:2003/api/coachesProfiles/profile/${coachEmail}`);
        setCoachProfile(response.data);
      } catch (error) {
        console.error('Error fetching coach profile:', error);
      }
    };

    fetchCoachProfile();
  }, [coachEmail]);

  const handleSendRequest = () => {
    setShowModal(true); // Show the modal when "Send Request" button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  if (!coachProfile) {
    return <p>Loading coach profile...</p>; // Display loading state while profile is being fetched
  }

  return (
    <div className="profile-card">
      <div className="profile-container">
        <div className="left-side">
          <div className="profile-picture">
            <img src={coachProfile.profileImage || '/path/to/default/profile.jpg'} alt="Profile" />
          </div>
          <h2>{coachProfile.fullName || "John Doe"}</h2>
          <h3>{coachProfile.specialization || "Fitness Coach"}</h3>
          <div className="details">
            <p><strong>Age:</strong> {coachProfile.age || 'N/A'}</p>
            <p><strong>Education:</strong> {coachProfile.education || 'N/A'}</p>
          </div>
          <div className="buttons-row">
            <button className="follow-button">Follow</button>
            <button className="send-request-button" onClick={() => navigate('/profile-setup')}>Send Request</button>
          </div>
        </div>
        <div className="right-side">
          <div className="card">
            <h4>Bio</h4>
            <p>{coachProfile.bio || 'No bio available'}</p>
          </div>
          <div className="card">
            <h4>Qualifications</h4>
            <p>{coachProfile.qualification || 'No qualifications available'}</p>
          </div>
          <div className="card">
            <h4>Coaching Style</h4>
            <p>{coachProfile.coachingStyle || 'No coaching style available'}</p>
          </div>
          <div className="card">
            <h4>Availability</h4>
            <p>{coachProfile.availability || 'No availability information'}</p>
          </div>
        </div>
      </div>


    </div>
  );
}

export default CoachDetail;


