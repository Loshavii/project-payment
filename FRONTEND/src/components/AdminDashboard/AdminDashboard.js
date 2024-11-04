
// export default AdminDashboard;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/AdminDashboard.css';
import logo from '../logo.png'

import { Link } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/'); // Redirect to login if not admin
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
      </header>
      <main className="content">
        <h1>Welcome onboard!</h1>
        <p>Your configuration is completed.</p>
        <div className="grid">
          <div className="grid-item">
            <h3>Coach Management</h3>
            <p>Manage coach activities and approve pending requests.</p>
            <Link to="/admin/coaches">Learn more →</Link>
          </div>
          <div className="grid-item">
            <h3>User Management</h3>
            <p>Manage user activities.</p>
            <Link to="/admin/users">Learn more →</Link>
          </div>
          <div className="grid-item">
            <h3>Activites</h3>
            <p>Explore a collection of reference applications.</p>
            <a href="#">Explore →</a>
          </div>
          <div className="grid-item">
            <h3>Community</h3>
            <p>Join our Discord and stay updated.</p>
            <a href="#">Join now →</a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
