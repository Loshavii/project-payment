
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileCard.css'; // Import the CSS file for styling

export default function ProfileCard() {
  const [profiles, setProfiles] = useState([]);

  // Fetch data from the API
  const fetchProfiles = async () => {
    const coachEmail = sessionStorage.getItem('coachEmail'); 
    if (!coachEmail) {
      console.error('Coach email is not found in sessionStorage.');
      return; 
    }

    try {
      const response = await axios.get(`http://localhost:2003/api/profiles/coach/${coachEmail}`);
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  // Function to update profile status with PUT method
  const updateProfileStatus = async (profileId, status) => {
    const url = `http://localhost:2003/api/profiles/${profileId}/${status === 'approved' ? 'approve' : 'decline'}`;
    try {
      await axios.put(url);  // Send a PUT request to update status
      fetchProfiles();  // Refresh profiles after updating status
      console.log(`Profile status updated to ${status}`);
    } catch (error) {
      console.error(`Error updating profile status to ${status}:`, error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="unique-profile-cards-container">
      {profiles.length > 0 ? (
        profiles.map((profile) => (
          <div key={profile._id} className="unique-profile-card">
            <h2 className="unique-profile-name">{profile.name}</h2>
            <p className="unique-profile-detail">Email: {profile.email}</p>
            <p className="unique-profile-detail">Gender: {profile.gender}</p>
            <p className="unique-profile-detail">Phone: {profile.phone}</p>
            <p className="unique-profile-detail">Height: {profile.height} cm</p>
            <p className="unique-profile-detail">Weight: {profile.weight} kg</p>
            <p className="unique-profile-detail">Blood Type: {profile.bloodType}</p>
            <p className="unique-profile-detail">Allergies: {profile.allergies}</p>
            <p className="unique-profile-detail">Chronic Conditions: {profile.chronicConditions}</p>
            <p className="unique-profile-detail">Medications: {profile.medications}</p>
            <p className="unique-profile-detail">Dietary Preferences: {profile.dietaryPreferences}</p>
            <p className="unique-profile-detail">Exercise Routine: {profile.exerciseRoutine}</p>
            <p className="unique-profile-detail">Sleep Pattern: {profile.sleepPattern} hours</p>
            <p className="unique-profile-detail">Target Weight: {profile.targetWeight} kg</p>
            <p className="unique-profile-detail">Fitness Objectives: {profile.fitnessObjectives}</p>
            <p className="unique-profile-detail">Blood Pressure: {profile.bloodPressure}</p>
            <p className="unique-profile-detail">Heart Rate: {profile.heartRate} bpm</p>
            <p className="unique-profile-detail">Blood Sugar Levels: {profile.bloodSugarLevels} mg/dL</p>
            <p className="unique-profile-detail">Contact Option: {profile.contactOption}</p>
            <p className="unique-profile-status">Status: {profile.status}</p>

            {/* Accept and Reject buttons */}
            <button
              className="unique-profile-accept"
              onClick={() => updateProfileStatus(profile._id, 'approved')}
            >
              Accept
            </button>
            <button
              className="unique-profile-reject"
              onClick={() => updateProfileStatus(profile._id, 'declined')}
            >
              Reject
            </button>
          </div>
        ))
      ) : (
        <p className="unique-no-profiles">No profiles available.</p>
      )}
    </div>
  );
}
