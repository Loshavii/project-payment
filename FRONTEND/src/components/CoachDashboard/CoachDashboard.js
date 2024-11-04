


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CoachDashboard = () => {
  const [coach, setCoach] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        const coachId = sessionStorage.getItem('id');
        const token = sessionStorage.getItem('token');
        if (coachId && token) {
          const response = await axios.get(`http://localhost:2003/api/coaches/coaches/${coachId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setCoach(response.data);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching coach data:', error);
      }
    };

    fetchCoachData();
  }, [navigate]);

  const goToProfile = () => {
    navigate('/coach-profile');
  };

  const viewRequests = () => {
    if (coach && coach.email) {
      navigate(`/profile-card/${coach.email}`); // Navigate to ProfileCard page with email
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile-section">
          {coach && (
            <>
              <img src="profile-pic-url" alt="Profile" className="profile-pic" />
              <h3>{`${coach.firstName} ${coach.lastName}`}</h3>
              <p>{coach.email}</p>
            </>
          )}
        </div>
        <nav className="nav-links">
          <a href="/dashboard" className="active">Dashboard</a>
          <a href="/members">My Members</a>
        </nav>
      </aside>
      <main className="main-content">
        <header className="dashboard-header">
          <h2>My Dashboard</h2>
        </header>
        <section className="onboarding-section">
          <div className="onboarding-text">
            <h3>Coach Onboarding</h3>
            <p>
              You’re a few steps away from getting started as a coach! 
              Make sure to fill out your assessment to ensure you get the best possible matches with new alumni.
            </p>
          </div>
          <div className="onboarding-buttons">
            <button className="btn complete-profile" onClick={goToProfile}>Complete Your Profile</button>
            <button className="btn take-assessment" onClick={viewRequests}>View Requests</button>
          </div>
        </section>
        <section className="stats-section">
          {/* Your stat cards */}
        </section>
      </main>
    </div>
  );
};

export default CoachDashboard;
