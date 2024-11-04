

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/UserDashboard/LandingPage';
import RegisterUser from './components/UserDashboard/RegisterUser';
import RegisterCoach from './components/UserDashboard/RegisterCoach';
import Login from './components/UserDashboard/Login';
import Coach from './components/UserDashboard/Coach';
import CoachDetail from './components/UserDashboard/CoachDetail';
import RegisterSelectPage from './components/UserDashboard/RegisterSelectPage';
import ProfileSetup from './components/UserDashboard/ProfileSetup';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CoachManagement from './components/CoachDashboard/Coach Management'; 
import Loginuser from './components/UserDashboard/Loginuser';
import CoachDashboard from './components/CoachDashboard/CoachDashboard';
import UserManagement from './components/AdminDashboard/UserManagement';
import CoachPro from './components/CoachDashboard/CoachProfile'; // Import CoachProfile
import UserDashboard from './components/UserDashboard/UserDashboard';
import ProfileCard from '../src/components/UserDashboard/ProfileCard';
import Payment from '../src/components/UserDashboard/Payment';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register-select" element={<RegisterSelectPage />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/register-coach" element={<RegisterCoach />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/coach" element={<Coach />} />
          <Route path="/coach/:coachEmail" element={<CoachDetail />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/admin/coaches" element={<CoachManagement />} />
          <Route path="/loginuser" element={<Loginuser />} />
          <Route path="/coach-dashboard" element={<CoachDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          {/* Add CoachProfile route */}
          <Route path="/coach-profile" element={<CoachPro />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/profile-card/:email" element={<ProfileCard />} />
          <Route path='/payment' element={<Payment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
