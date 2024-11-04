
// import React, { useEffect, useState } from 'react';
// import '../CSS/Coach.css';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Coach = () => {
//   const [coaches, setCoaches] = useState([]);

//   useEffect(() => {
//     const fetchCoaches = async () => {
//       try {
//         const response = await axios.get('http://localhost:2003/api/coaches/coaches/approved');
//         setCoaches(response.data);
//       } catch (error) {
//         console.error('Error fetching coaches:', error);
//       }
//     };
    
//     fetchCoaches();
//   }, []);

//   return (
//     <div className="coaches-container">
//       {coaches.map((coach) => (
//         <div key={coach._id} className="coach-card">
//           <img src="/path/to/profile/image" alt="Coach" className="coach-img" />
//           <div className="coach-info">
//             <h2 className="coach-name">{coach.username || 'Unknown Coach'}</h2>
//             <p className="coach-text">
//               Specialization: {coach.specialization || 'N/A'}<br />
//               {coach.experience || 'N/A'} exp.
//             </p>
//             <Link to={`/coach/${coach.email}`}>
//               <button className="book-session-btn">View Details</button>
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Coach;

import React, { useEffect, useState } from 'react';
import '../CSS/Coach.css';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const Coach = () => {
  const [coaches, setCoaches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await axios.get('http://localhost:2003/api/coaches/coaches/approved');
        setCoaches(response.data);
      } catch (error) {
        console.error('Error fetching coaches:', error);
      }
    };

    fetchCoaches();
  }, []);

  const handleViewDetails = (email) => {
    // Store the coach's email in session storage
    sessionStorage.setItem('coachEmail', email);
    // Navigate to the coach's details page
    navigate(`/coach/${email}`);
  };

  return (
    <div className="login-page">

    <div className="coaches-container">
      {coaches.map((coach) => (
        <div key={coach._id} className="coach-card">
          <img src="/path/to/profile/image" alt="Coach" className="coach-img" />
          <div className="coach-info">
            <h2 className="coach-name">{coach.username || 'Unknown Coach'}</h2>
            <p className="coach-text">
              Specialization: {coach.specialization || 'N/A'}<br />
              {coach.experience || 'N/A'} exp.
            </p>
            <button
              className="book-session-btn"
              onClick={() => handleViewDetails(coach.email)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Coach;
